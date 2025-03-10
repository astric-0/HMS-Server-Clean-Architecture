import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import ApplicationEventPublisherModule from 'src/Common/Application/ApplicationPublisher/ApplicationEventPublisherModule';

import FileDownloadQueueService from './FileDownloadQueue/FileDownloadQueueService';
import FileDownloadProcessor from './FileDownloadQueue/FileDownloadProcessor';

@Module({
  imports: [
    BullModule.forRoot({
      connection: { host: 'hms-redis', port: 6379 },
    }),
    BullModule.registerQueue({
      name: FileDownloadQueueService.QueueName,
    }),
    ApplicationEventPublisherModule,
  ],
  providers: [
    FileDownloadProcessor,
    FileDownloadQueueService,
    {
      provide: FileDownloadQueueService.Token,
      useExisting: FileDownloadQueueService,
    },
  ],
  exports: [
    {
      provide: FileDownloadQueueService.Token,
      useExisting: FileDownloadQueueService,
    },
  ],
})
export default class QueueModule {}
