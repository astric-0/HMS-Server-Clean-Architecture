import { Module } from '@nestjs/common';

import ApplicationModule from './Media/Application/ApplicationModule';
//import QueueModule from './Media/Infrastructure/Queue/QueueModule';
//import PersistenceModule from './Media/Infrastructure/Persistence/PersistenceModule';
import ApiModule from './Api/ApiModule';

@Module({
  imports: [
    ApiModule,
    //QueueModule,
    //PersistenceModule,
    ApplicationModule,
  ],
})
export default class MainModule {}
