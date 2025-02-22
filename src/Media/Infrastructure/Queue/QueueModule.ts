import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';

import DownloadFileQueueService from './DownloadFileQueue/DownloadFileQueueService';
import DownloadFileProcessor from './DownloadFileQueue/DownloadFileProcessor';

@Module({
  imports: [
    BullModule.forRoot({
      connection: { host: 'hms-redis', port: 6379 },
    }),
    BullModule.registerQueue({
      name: DownloadFileQueueService.QueueName,
    }),
  ],
  providers: [
    DownloadFileProcessor,
    DownloadFileQueueService,
    { provide: 'IQueueService', useExisting: DownloadFileQueueService },
  ],
  exports: [
    { provide: 'IQueueService', useExisting: DownloadFileQueueService },
  ],
})
export default class QueueModule {}
