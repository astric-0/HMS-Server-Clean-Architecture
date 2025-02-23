import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import MediaFileSchema from './Schemas/MediaFileSchema';
import TypeOrmConfiguration from './Configuration/TypeOrmConfiguration';
import { ConfigModule } from '@nestjs/config';
import MediaFileRepository from './Repositories/MediaFileRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaFileSchema]),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfiguration,
      imports: [ConfigModule],
    }),
  ],
  providers: [
    MediaFileRepository,
    { provide: MediaFileRepository.Token, useExisting: MediaFileRepository },
  ],
  exports: [
    TypeOrmModule,
    { provide: MediaFileRepository.Token, useExisting: MediaFileRepository },
  ],
})
export default class PersistenceModule {}
