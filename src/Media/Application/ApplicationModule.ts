import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CacheModule } from '@nestjs/cache-manager';

import QueueModule from '../Infrastructure/Queue/QueueModule';
import PersistenceModule from '../Infrastructure/Persistence/PersistenceModule';

import MediaFileDownloadCommandHandler from './MediaFiles/MediaFileDownload/MediaFileDownloadCommandHandler';
import MediaFileDownloadedEventHandler from './MediaFiles/MediaFileDownload/MediaFIleDownloadedEventHandler';
import MediaFileGetByIdQueryHandler from './MediaFiles/MediaFileGet/MediaFileGetByIdQueryHandler';

@Module({
  imports: [QueueModule, PersistenceModule, CqrsModule, CacheModule.register()],
  providers: [
    MediaFileDownloadCommandHandler,
    MediaFileDownloadedEventHandler,
    MediaFileGetByIdQueryHandler,
  ],
})
export default class ApplicationModule {}
