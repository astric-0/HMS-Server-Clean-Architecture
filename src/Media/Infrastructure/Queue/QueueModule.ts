import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';

import ApplicationEventPublisherModule from 'src/Common/Application/ApplicationPublisher/ApplicationEventPublisherModule';

import FileDownloadService from './FileDownload/FileDownloadService';
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
    FileDownloadService,
    {
      provide: FileDownloadService.Token,
      useExisting: FileDownloadService,
    },
    FileDownloadQueueService,
    {
      provide: FileDownloadQueueService.Token,
      useExisting: FileDownloadQueueService,
    },
    RarExtractionProcessor,
    RarExtractionService,
    {
      provide: RarExtractionService.Token,
      useExisting: RarExtractionService,
    },
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
