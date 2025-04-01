import { Module } from '@nestjs/common';

import ThumbnailService from './Thumbnail/ThumbnailService';

@Module({
  providers: [
    ThumbnailService,
    {
      provide: ThumbnailService.Token,
      useExisting: ThumbnailService,
    },
  ],
  exports: [
    {
      provide: ThumbnailService.Token,
      useExisting: ThumbnailService,
    },
  ],
})
export default class ServiceModule {}
