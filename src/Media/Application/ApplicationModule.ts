import { Module } from '@nestjs/common';

import DownloadMediaFileCommandHandler from './MediaFiles/DownloadMediaFile/DownloadMediaFileCommandHandler';
import QueueModule from '../Infrastructure/Queue/QueueModule';

@Module({
  imports: [QueueModule],
  providers: [DownloadMediaFileCommandHandler],
})
export default class ApplicationModule {}
