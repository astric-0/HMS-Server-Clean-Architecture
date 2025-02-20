import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import MediaFileSchema from './Schemas/MediaFileSchema';
import TypeOrmConfiguration from './Configuration/TypeOrmConfiguration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([MediaFileSchema]),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfiguration,
      imports: [ConfigModule],
    }),
    //ConfigModule,
  ],
  providers: [],
  exports: [TypeOrmModule],
})
export default class PersistenceModule {}
