import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';

//modules
import PersistenceModule from 'src/Media/Infrastructure/Persistence/PersistenceModule';

//controllers
import MediaFileController from './Controllers/MediaFiles/MediaFileController';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CqrsModule.forRoot(),
    PersistenceModule,
  ],
  controllers: [MediaFileController],
  providers: [],
})
export default class ApiModule {}
