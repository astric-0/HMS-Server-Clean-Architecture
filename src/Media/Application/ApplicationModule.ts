import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import QueueModule from '../Infrastructure/Queue/QueueModule';
import PersistenceModule from '../Infrastructure/Persistence/PersistenceModule';

import MediaFileDownloadCommandHandler from './MediaFiles/MediaFileDownload/MediaFileDownloadCommandHandler';
import MediaFileDownloadedEventHandler from './MediaFiles/MediaFileDownload/MediaFIleDownloadedEventHandler';

@Module({
  imports: [QueueModule, PersistenceModule, CqrsModule],
  providers: [MediaFileDownloadCommandHandler, MediaFileDownloadedEventHandler],
})
export default class ApplicationModule {}
