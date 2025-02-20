import { NestFactory } from '@nestjs/core';
import ApiModule from './Api/ApiModule';
// import { webcrypto } from 'crypto';
// (global as any).crypto = webcrypto;

async function bootstrap() {
  const app = await NestFactory.create(ApiModule);
  console.log('LISTENING');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
