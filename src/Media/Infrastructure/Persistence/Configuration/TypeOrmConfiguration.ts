import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export default class TypeOrmConfiguration implements TypeOrmOptionsFactory {
  constructor(
    @Inject<ConfigService>() private readonly configService: ConfigService,
  ) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.getOrThrow('DATABASE_URL'),
      autoLoadEntities: true,
      synchronize: false, // process.env.NODE_ENV !== 'production',
    };
  }
}
