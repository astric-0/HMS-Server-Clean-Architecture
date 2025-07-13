import { Job, Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';

import IQueueService, {
  IJobInfo,
} from 'src/Common/Application/Abstractions/Services/Queue/IQueueService';

import RarExtractionJobData from './RarExtractionJobData';
import BaseQueueService from 'src/Common/Application/Abstractions/Services/Queue/BaseQueueService';

@Injectable()
export default class RarExtractionQueueService
  extends BaseQueueService
  implements IQueueService<RarExtractionJobData>
{
  public static readonly Token = Symbol('RarExtractionQueueService');

  public static get QueueName(): string {
    return 'RarExtractionQueue';
  }

  constructor(
    @InjectQueue(RarExtractionQueueService.QueueName)
    private readonly queue: Queue<RarExtractionJobData, number, string>,
  ) {
    super();
  }

  public async GetJobsInfo(): Promise<IJobInfo<RarExtractionJobData>[]> {
    const jobs: Job<RarExtractionJobData, any, string>[] =
      await this.queue.getJobs();

    return jobs.map(RarExtractionQueueService.MapToJobInfo);
  }

  public async AddToQueue(
    data: RarExtractionJobData,
  ): Promise<Job<RarExtractionJobData, any, string>> {
    const job: Job<RarExtractionJobData> = await this.queue.add(
      RarExtractionQueueService.QueueName,
      data,
    );

    return job;
  }
}
