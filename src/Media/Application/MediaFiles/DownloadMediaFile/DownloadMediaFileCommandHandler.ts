import { UUIDTypes } from 'uuid';
import { CommandHandler } from '@nestjs/cqrs';
import { Job } from 'bullmq';

import Result from 'src/Media/Domain/Shared/Result';
import Error, { ErrorType } from 'src/Media/Domain/Shared/Error';
import DownloadMediaFileCommand from './DownloadMediaFileCommand';
import ICommandHandler from '../../Shared/Messaging/ICommandHandler';
import IQueueService from '../../Queue/IQueueService';
import DownloadFileJobData from 'src/Media/Infrastructure/Queue/DownloadFileQueue/DownloadFileJobData';
import { Inject } from '@nestjs/common';

@CommandHandler(DownloadMediaFileCommand)
export default class DownloadMediaFileCommandHandler
  implements ICommandHandler<DownloadMediaFileCommand, UUIDTypes>
{
  constructor(
    // @InjectQueue(DownloadFileQueueService.QueueName)
    @Inject('IQueueService')
    private readonly downloadQueueService: IQueueService<DownloadFileJobData>,
  ) {}

  private static get DownloadPath() {
    return './downloads/';
  }

  public async execute(
    command: DownloadMediaFileCommand,
  ): Promise<Result<UUIDTypes>> {
    const data: DownloadFileJobData = new DownloadFileJobData(
      command.MediaFileName,
      command.MasterDirectory,
      command.URL,
      DownloadMediaFileCommandHandler.DownloadPath + command.MediaFileName,
    );

    try {
      const job: Job<DownloadFileJobData> =
        await this.downloadQueueService.AddToQueue(data);
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
