import { Job } from 'bullmq';

export default interface IQueueService<TData> {
  AddToQueue(data: TData): Promise<Job<TData>>;
}
