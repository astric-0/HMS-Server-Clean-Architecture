import { IEvent } from '@nestjs/cqrs';

export interface IApplicationEvent extends IEvent {
  readonly OccuredOn: Date;
}
