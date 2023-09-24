import { Global, Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';

import {
  CacheModule as MxCacheModule,
  RedisCacheModuleOptions,
} from '@multiversx/sdk-nestjs-cache';

import { CacheConfigService } from './caching-config.service';
import { ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MxCacheModule.forRootAsync({
      // imports: [ApiConfigModule.forRoot(configuration)],
      useFactory: (config: ConfigService) =>
        new RedisCacheModuleOptions({
          host: config.get<string>('REDIS_HOST'),
          port: config.get<number>('REDIS_PORT'),
          username: config.get<string>('REDIS_USERNAME'),
          password: config.get<string>('REDIS_PASSWORD'),
        }),
      inject: [ConfigService],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useClass: CacheConfigService,
    }),
  ],
  providers: [
    // CachingService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: CacheInterceptor,
    // },
  ],
})
export class CachingModule {}
