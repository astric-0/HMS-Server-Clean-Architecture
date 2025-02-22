import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import IQueueService from 'src/Media/Application/Queue/IQueueService';
import DownloadFileJobData from './DownloadFileJobData';

@Injectable()
export default class DownloadFileQueueService
  implements IQueueService<DownloadFileJobData>
{
  public static get QueueName() {
    return 'DownloadQueue';
  }

  public static get DownloadJobName() {
    return 'DownloadJob';
  }

  constructor(
    @InjectQueue(DownloadFileQueueService.QueueName)
    private readonly queue: Queue<DownloadFileJobData, number, string>,
  ) {}

  public async AddToQueue(
    data: DownloadFileJobData,
  ): Promise<Job<DownloadFileJobData>> {
    const job: Job<DownloadFileJobData> = await this.queue.add(
      DownloadFileQueueService.QueueName,
      data,
    );

    return job;
  }
}
