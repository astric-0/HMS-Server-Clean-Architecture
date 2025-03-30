import { Job } from 'bullmq';
import { IJobInfo } from './IQueueService';

export default abstract class BaseQueueService {
  protected static MapToJobInfo<TData>(
    job: Job<TData>,
  ): Readonly<IJobInfo<TData>> {
    return {
      Id: job.id,
      Name: job.name,
      Data: job.data,
      Progress: job.progress as number,
      TimeStamp: job.timestamp,
      AttemptsStarted: job.attemptsStarted,
      AttemptsMade: job.attemptsMade,
      FailedReason: job.failedReason,
      FinishedOn: job.finishedOn,
      ProcessedOn: job.processedOn,
    };
  }
}
