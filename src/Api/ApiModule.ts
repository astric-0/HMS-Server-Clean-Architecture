import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import MediaFileController from './Controllers/MediaFiles/MediaFileController';
import MediaDirectoryController from './Controllers/MediaDirectories/MediaDirectoryController';

@Module({
  imports: [CqrsModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [MediaFileController, MediaDirectoryController],
})
export default class ApiModule {}
