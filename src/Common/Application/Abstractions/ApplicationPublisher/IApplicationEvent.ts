import { IEvent } from '@nestjs/cqrs';

export default interface IApplicationEvent extends IEvent {
  readonly OccuredOn: Date;
}
