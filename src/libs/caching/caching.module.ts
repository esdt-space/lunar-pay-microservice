import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import {
  CacheModule as MxCacheModule,
  RedisCacheModuleOptions,
} from '@multiversx/sdk-nestjs-cache';

import { CacheConfigService } from './caching-config.service';

@Global()
@Module({
  imports: [
    MxCacheModule.forRootAsync({
      useFactory: (config: ConfigService) =>
        new RedisCacheModuleOptions({
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
          username: config.get<string>('REDIS_USERNAME'),
          password: config.get<string>('REDIS_PASSWORD'),
          // @ts-ignore
          family: Number(config.get<number>('REDIS_FAMILY')),
        }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService,
    }),
  ],
})
export class CachingModule {}
