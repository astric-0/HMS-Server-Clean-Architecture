import { UUIDTypes } from 'uuid';
import { CommandHandler } from '@nestjs/cqrs';
import { Job } from 'bullmq';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { basename, join, extname } from 'path';
import contentDisposition from 'content-disposition';

import Result from 'src/Common/Domain/Result';
import Error, { ErrorType } from 'src/Common/Domain/Error';
import ICommandHandler from 'src/Common/Application/Abstractions/Messaging/ICommandHandler';
import IQueueService from 'src/Common/Application/Abstractions/Services/Queue/IQueueService';
import IMediaDirectoryRepository from 'src/Common/Application/Abstractions/Repositories/MediaDirectory/IMediaDirectoryRepository';

import MediaDirectory from 'src/Media/Domain/MediaDirectories/MediaDirectory';
import MediaDirectoryErrors from 'src/Media/Domain/MediaDirectories/MediaDirectoryErrors';

import FileDownloadJobData from 'src/Media/Infrastructure/Queue/FileDownloadQueue/FileDownloadJobData';
import FileDownloadQueueService from 'src/Media/Infrastructure/Queue/FileDownloadQueue/FileDownloadQueueService';
import MediaDirectoryRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaDirectoryRepository';

import MediaFileDownloadCommand from './MediaFileDownloadCommand';

@CommandHandler(MediaFileDownloadCommand)
export default class DownloadMediaFileCommandHandler
  implements ICommandHandler<MediaFileDownloadCommand, UUIDTypes>
{
  constructor(
    @Inject(FileDownloadQueueService.Token)
    private readonly fileDownloadQueueService: IQueueService<FileDownloadJobData>,
    @Inject(MediaDirectoryRepository.Token)
    private readonly mediaDirectoryRepository: IMediaDirectoryRepository<MediaDirectory>,
    @Inject() private readonly configService: ConfigService,
  ) {}

  private get UniqueDirectoryPath() {
    return join(
      this.configService.getOrThrow('BASE_MEDIA_VIDEO_DIR'),
      new Date().toISOString(),
    );
  }

  public async execute(
    command: MediaFileDownloadCommand,
  ): Promise<Result<UUIDTypes>> {
    const mediaDirectory: MediaDirectory =
      await this.mediaDirectoryRepository.GetById(command.MediaDirectoryId);

    if (!mediaDirectory?.Id)
      return Result.Failure(MediaDirectoryErrors.NotFound);

    const fileDirectoryPath: string = this.UniqueDirectoryPath;
    const mediaFileName: string =
      command.MediaFileName ||
      (await DownloadMediaFileCommandHandler.GetFileName(command.URL));

    const data: FileDownloadJobData = new FileDownloadJobData(
      mediaFileName,
      `${basename(mediaFileName, extname(mediaFileName))}.png`,
      command.MediaDirectoryId as string,
      command.URL,
      fileDirectoryPath,
      fileDirectoryPath,
    );

    try {
      const job: Job<FileDownloadJobData> =
        await this.fileDownloadQueueService.AddToQueue(data);

      return Result.Success(job.id);
    } catch (error) {
      return Result.Failure(
        new Error(
          'MediaFileDownload.Failure',
          error.message,
          ErrorType.Failure,
        ),
      );
    }
  }

  private static async GetFileName(url: string) {
    const fileName: string =
      await DownloadMediaFileCommandHandler.GetFileNamingBySendingHeadRequest(
        url,
      );

    if (fileName) return fileName;

    const urlObj = new URL(url);
    return basename(urlObj.pathname) || 'download.mkv';
  }

  private static async GetFileNamingBySendingHeadRequest(
    url: string,
  ): Promise<string> {
    try {
      const response = await fetch(url, { method: 'HEAD' });
      const disposition: string = response.headers['content-disposition'];

      if (!disposition) return null;

      const parsed: Record<
        string,
        Record<string, string>
      > = contentDisposition.parse(disposition);

      return parsed?.parameters?.filename;
    } catch {
      return null;
    }
  }
}
