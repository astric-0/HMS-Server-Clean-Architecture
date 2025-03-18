import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import ApplicationEventPublisherModule from 'src/Common/Application/ApplicationPublisher/ApplicationEventPublisherModule';

import FileDownloadQueueService from './FileDownload/FileDownloadQueueService';
import FileDownloadProcessor from './FileDownload/FileDownloadProcessor';

import RarExtractionService from './Extract/RarExtractionService';
import RarExtractionQueueService from './Extract/RarExtractionQueueService';
import RarExtractionProcessor from './Extract/RarExtractionProcessor';

@Module({
  imports: [
    BullModule.forRoot({
      connection: { host: 'hms-redis', port: 6379 },
    }),
    BullModule.registerQueue(
      {
        name: FileDownloadQueueService.QueueName,
      },
      {
        name: RarExtractionQueueService.QueueName,
      },
    ),
    ApplicationEventPublisherModule,
  ],
  providers: [
    FileDownloadProcessor,
    FileDownloadQueueService,
    {
      provide: FileDownloadQueueService.Token,
      useExisting: FileDownloadQueueService,
    },
    RarExtractionProcessor,
    RarExtractionService,
    RarExtractionQueueService,
    {
      provide: RarExtractionQueueService.Token,
      useExisting: RarExtractionQueueService,
    },
  ],
  exports: [
    {
      provide: FileDownloadQueueService.Token,
      useExisting: FileDownloadQueueService,
    },
    {
      provide: RarExtractionQueueService.Token,
      useExisting: RarExtractionQueueService,
    },
  ],
})
export default class QueueModule {}
