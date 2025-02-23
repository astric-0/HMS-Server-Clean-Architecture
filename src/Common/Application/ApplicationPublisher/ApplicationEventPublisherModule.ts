import { Module } from '@nestjs/common';
import ApplicationEventPublisher from './ApplicationEventPublisher copy';
import { CqrsModule } from '@nestjs/cqrs';
@Module({
  imports: [CqrsModule],
  providers: [
    ApplicationEventPublisher,
    {
      provide: ApplicationEventPublisher.Token,
      useExisting: ApplicationEventPublisher,
    },
  ],
  exports: [
    {
      provide: ApplicationEventPublisher.Token,
      useExisting: ApplicationEventPublisher,
    },
  ],
})
export default class ApplicationEventPublisherModule {}
