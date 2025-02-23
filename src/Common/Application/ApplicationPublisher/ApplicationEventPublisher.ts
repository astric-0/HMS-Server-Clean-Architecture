import { EventBus } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';
import { IApplicationEvent } from '../Abstractions/ApplicationPublisher/IApplicationEvent';
import IApplicationEventPublisher from '../Abstractions/ApplicationPublisher/IApplicationEventPublisher';

@Injectable()
export default class ApplicationEventPublisher
  implements IApplicationEventPublisher
{
  public static Token: symbol = Symbol('IApplicationEventPublisher');

  constructor(private readonly eventBus: EventBus) {}

  Publish(event: IApplicationEvent): void {
    this.eventBus.publish(event);
  }

  PublishAll(events: IApplicationEvent[]): void {
    this.eventBus.publishAll(events);
  }
}
