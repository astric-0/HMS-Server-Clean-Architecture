import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

import MediaFileController from './Controllers/MediaFiles/MediaFileController';

@Module({
  imports: [CqrsModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [MediaFileController],
})
export default class ApiModule {}
