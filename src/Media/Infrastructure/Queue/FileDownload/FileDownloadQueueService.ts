import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bullmq';

import IQueueService, {
  IJobInfo,
} from 'src/Common/Application/Abstractions/Services/Queue/IQueueService';
import BaseQueueService from 'src/Common/Application/Abstractions/Services/Queue/BaseQueueService';

import FileDownloadJobData from './FileDownloadJobData';

@Injectable()
export default class FileDownloadQueueService
  extends BaseQueueService
  implements IQueueService<FileDownloadJobData>
{
  public static readonly Token: symbol = Symbol('IQueueService');

  public static get QueueName(): string {
    return 'DownloadQueue';
  }

  public static get DownloadJobName() {
    return 'DownloadJob';
  }

  constructor(
    @InjectQueue(FileDownloadQueueService.QueueName)
    private readonly queue: Queue<FileDownloadJobData, number, string>,
  ) {
    super();
  }

  public async GetJobsInfo(): Promise<IJobInfo<FileDownloadJobData>[]> {
    const jobs = await this.queue.getJobs();
    return jobs.map(FileDownloadQueueService.MapToJobInfo);
  }

  public async AddToQueue(
    data: FileDownloadJobData,
  ): Promise<Job<FileDownloadJobData>> {
    const job: Job<FileDownloadJobData> = await this.queue.add(
      FileDownloadQueueService.QueueName,
      data,
    );

    return job;
  }
}
