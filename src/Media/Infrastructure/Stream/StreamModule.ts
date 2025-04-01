import { Module } from '@nestjs/common';

import FileStreamService from './FileStream/FileStreamService';

@Module({
  providers: [
    FileStreamService,
    {
      provide: FileStreamService.Token,
      useExisting: FileStreamService,
    },
  ],
  exports: [
    {
      provide: FileStreamService.Token,
      useExisting: FileStreamService,
    },
  ],
})
export default class StreamModule {}
