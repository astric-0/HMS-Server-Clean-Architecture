import { Job } from 'bullmq';

export default interface IQueueService<TData> {
  AddToQueue(data: TData): Promise<Job<TData>>;

  GetJobsInfo(): Promise<IJobInfo<TData>[]>;
}

export interface IJobInfo<TData> {
  Id: string;
  Name: string;
  Data: TData;
  Progress: number;
  TimeStamp: number;
  AttemptsStarted: number;
  AttemptsMade: number;
  FailedReason: string;
  FinishedOn?: number;
  ProcessedOn?: number;
}
