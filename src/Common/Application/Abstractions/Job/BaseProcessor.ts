import { WorkerHost } from '@nestjs/bullmq';
import { Logger } from '@nestjs/common';
import { Job } from 'bullmq';

export default abstract class BaseProcessor<
  TJobData,
  TReturnType = void,
> extends WorkerHost {
  abstract ProcessJob(job: Job<TJobData>): Promise<TReturnType>;

  abstract OnJobCompletion(
    job: Job<TJobData> | void,
    value: TReturnType,
  ): Promise<void> | void;

  public async process(job: Job<TJobData>): Promise<void> {
    Logger.log(`JOB STARTED: ${job.name}`);

    const value = await this.ProcessJob?.(job);

    await this.OnJobCompletion?.(job, value);

    Logger.log(`JOB ENDED: ${job.name}`);
  }
}
