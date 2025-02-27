import { UUIDTypes } from 'uuid';
import { CommandHandler } from '@nestjs/cqrs';
import { Job } from 'bullmq';
import { Inject } from '@nestjs/common';

import Result from 'src/Common/Domain/Result';
import Error, { ErrorType } from 'src/Common/Domain/Error';
import DownloadMediaFileCommand from './MediaFileDownloadCommand';
import ICommandHandler from '../../../../Common/Application/Abstractions/Messaging/ICommandHandler';
import IQueueService from '../../../../Common/Application/Abstractions/Queue/IQueueService';

import FileDownloadJobData from 'src/Media/Infrastructure/Queue/FileDownloadQueue/FileDownloadJobData';
import FileDownloadQueueService from 'src/Media/Infrastructure/Queue/FileDownloadQueue/FileDownloadQueueService';

@CommandHandler(DownloadMediaFileCommand)
export default class DownloadMediaFileCommandHandler
  implements ICommandHandler<DownloadMediaFileCommand, UUIDTypes>
{
  constructor(
    @Inject(FileDownloadQueueService.Token)
    private readonly fileDownloadQueueService: IQueueService<FileDownloadJobData>,
  ) {}

  private static get DownloadPath() {
    return './downloads/';
  }

  public async execute(
    command: DownloadMediaFileCommand,
  ): Promise<Result<UUIDTypes>> {
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
