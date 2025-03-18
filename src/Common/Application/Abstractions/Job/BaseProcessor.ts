import { WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

export default abstract class BaseProcessor<T> extends WorkerHost {
  public abstract ProcessJob(job: Job<T>): Promise<void>;

  public async process(job: Job<T>): Promise<void> {
    Logger.log(`JOB STARTED: ${job.name}`);
    await this.ProcessJob(job);
    Logger.log(`JOB ENDED: ${job.name}`);
  }
}
