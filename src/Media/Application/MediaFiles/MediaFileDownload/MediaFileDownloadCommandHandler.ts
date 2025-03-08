import { UUIDTypes } from 'uuid';
import { CommandHandler } from '@nestjs/cqrs';
import { Job } from 'bullmq';
import { Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { basename, join, extname } from 'path';

import Result from 'src/Common/Domain/Result';
import Error, { ErrorType } from 'src/Common/Domain/Error';
import ICommandHandler from 'src/Common/Application/Abstractions/Messaging/ICommandHandler';
import IQueueService from 'src/Common/Application/Abstractions/Queue/IQueueService';
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
    const data: FileDownloadJobData = new FileDownloadJobData(
      command.MediaFileName,
      command.MediaDirectoryId as string,
      command.URL,
      join(fileDirectoryPath, command.MediaFileName),
      join(
        fileDirectoryPath,
        `${basename(command.MediaFileName, extname(command.MediaFileName))}.png`,
      ),
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
}
