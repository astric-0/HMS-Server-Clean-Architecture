import { UUIDTypes } from 'uuid';
import { CommandHandler } from '@nestjs/cqrs';
import { Job } from 'bullmq';
import { Inject } from '@nestjs/common';

import Result from 'src/Common/Domain/Result';
import Error, { ErrorType } from 'src/Common/Domain/Error';
import ICommandHandler from 'src/Common/Application/Abstractions/Messaging/ICommandHandler';
import IQueueService from 'src/Common/Application/Abstractions/Queue/IQueueService';
import IMediaDirectoryRepository from 'src/Common/Application/Abstractions/Repositories/MediaDirectory/IMediaDirectoryRepository';

import MediaDirectory from 'src/Media/Domain/MediaDirectories/MediaDirectory';

import FileDownloadJobData from 'src/Media/Infrastructure/Queue/FileDownloadQueue/FileDownloadJobData';
import FileDownloadQueueService from 'src/Media/Infrastructure/Queue/FileDownloadQueue/FileDownloadQueueService';
import MediaDirectoryRepository from 'src/Media/Infrastructure/Persistence/Repositories/MediaDirectoryRepository';

import DownloadMediaFileCommand from './MediaFileDownloadCommand';
import { MediaDirectoryName } from 'src/Common/Domain/MediaDirectory/ValueTypes';
import MediaDirectoryErrors from 'src/Media/Domain/MediaDirectories/MediaDirectoryErrors';

@CommandHandler(DownloadMediaFileCommand)
export default class DownloadMediaFileCommandHandler
  implements ICommandHandler<DownloadMediaFileCommand, UUIDTypes>
{
  constructor(
    @Inject(FileDownloadQueueService.Token)
    private readonly fileDownloadQueueService: IQueueService<FileDownloadJobData>,
    @Inject(MediaDirectoryRepository.Token)
    private readonly mediaDirectoryRepository: IMediaDirectoryRepository<MediaDirectory>,
  ) {}

  private static get DownloadPath() {
    return './downloads/';
  }

  public async execute(
    command: DownloadMediaFileCommand,
  ): Promise<Result<UUIDTypes>> {
    const exists: boolean =
      await this.mediaDirectoryRepository.CheckMasterDirectoryExistsByName(
        new MediaDirectoryName(command.MasterDirectory),
      );

    if (!exists) return Result.Failure(MediaDirectoryErrors.NotFound);

    const data: FileDownloadJobData = new FileDownloadJobData(
      command.MediaFileName,
      command.MasterDirectory,
      command.URL,
      DownloadMediaFileCommandHandler.DownloadPath + command.MediaFileName,
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
