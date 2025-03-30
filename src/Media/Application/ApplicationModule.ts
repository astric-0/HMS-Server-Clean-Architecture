import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CacheModule } from '@nestjs/cache-manager';

import QueueModule from '../Infrastructure/Queue/QueueModule';
import PersistenceModule from '../Infrastructure/Persistence/PersistenceModule';
import ServiceModule from '../Infrastructure/Services/ServiceModule';

import MediaFileDownloadCommandHandler from './MediaFiles/MediaFileDownload/MediaFileDownloadCommandHandler';
import MediaFileDownloadedEventHandler from './MediaFiles/MediaFileDownload/MediaFileDownloadedEventHandler';
import MediaFileGetByIdQueryHandler from './MediaFiles/MediaFileGet/MediaFileGetByIdQueryHandler';
import MediaFileGetAllQueryHandler from './MediaFiles/MediaFileGet/MediaFileGetAllQueryHandler';
import MediaFileGetFullPathQueryHandler from './MediaFiles/MediaFileGet/MediaFileGetFullPathQueryHandler';
import MediaFileExtractCommandHandler from './MediaFiles/MediaFileExtract/MediaFileExtractCommandHandler';
import MediaFileCreateThumbnailCommandHandler from './MediaFiles/MediaFileThumbnail/MediaFileCreateThumbnailCommandHandler';
import MediaFileExtractedEventHandler from './MediaFiles/MediaFileExtract/MediaFileExtractedEventHandler';

import MediaDirectoryCreateCommandHandler from './MediaDirectories/MediaDirectoryCreate/MediaDirectoryCreateCommandHandler';
import MediaDirectoryGetByIdQueryHandler from './MediaDirectories/MediaDirectoryGet/MediaDirectoryGetByIdQueryHandler';

@Module({
  imports: [
    QueueModule,
    PersistenceModule,
    CqrsModule,
    ServiceModule,
    CacheModule.register(),
  ],
  providers: [
    MediaFileDownloadCommandHandler,
    MediaFileDownloadedEventHandler,
    MediaFileGetByIdQueryHandler,
    MediaFileGetAllQueryHandler,
    MediaFileGetFullPathQueryHandler,
    MediaFileExtractCommandHandler,
    MediaFileExtractedEventHandler,
    MediaFileCreateThumbnailCommandHandler,
    MediaDirectoryCreateCommandHandler,
    MediaDirectoryGetByIdQueryHandler,
  ],
})
export default class ApplicationModule {}
