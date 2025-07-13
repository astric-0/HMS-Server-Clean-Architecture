import { NestFactory } from '@nestjs/core';
import MainModule from './MainModule';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);
  console.log('LISTENING');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
