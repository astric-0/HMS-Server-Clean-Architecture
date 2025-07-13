import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import MediaFileEntity from './Schemas/MediaFileEntity';
import MediaDirectoryEntity from './Schemas/MediaDirectoryEntity';

import TypeOrmConfiguration from './Configuration/TypeOrmConfiguration';
import MediaFileRepository from './Repositories/MediaFileRepository';
import MediaDirectoryRepository from './Repositories/MediaDirectoryRepository';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaFileEntity, MediaDirectoryEntity]),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfiguration,
      imports: [ConfigModule],
    }),
  ],
  providers: [
    MediaFileRepository,
    MediaDirectoryRepository,
    { provide: MediaFileRepository.Token, useExisting: MediaFileRepository },
    {
      provide: MediaDirectoryRepository.Token,
      useExisting: MediaDirectoryRepository,
    },
  ],
  exports: [
    TypeOrmModule,
    { provide: MediaFileRepository.Token, useExisting: MediaFileRepository },
    {
      provide: MediaDirectoryRepository.Token,
      useExisting: MediaDirectoryRepository,
    },
  ],
})
export default class PersistenceModule {}
