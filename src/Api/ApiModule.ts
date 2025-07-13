import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import StreamModule from 'src/Media/Infrastructure/Stream/StreamModule';

import MediaFileController from './Controllers/MediaFiles/MediaFileController';
import MediaDirectoryController from './Controllers/MediaDirectories/MediaDirectoryController';

@Module({
  imports: [CqrsModule, ConfigModule.forRoot({ isGlobal: true }), StreamModule],
  controllers: [MediaFileController, MediaDirectoryController],
})
export default class ApiModule {}
