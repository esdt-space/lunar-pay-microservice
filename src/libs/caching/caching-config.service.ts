import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { redisStore } from 'cache-manager-ioredis-yet';
import {
  CacheModuleOptions,
  CacheOptionsFactory,
  CacheStore,
} from '@nestjs/cache-manager';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  async createCacheOptions(): Promise<CacheModuleOptions> {
    return {
      ttl: 5,
      store: (await redisStore({
        host: this.config.get<string>('REDIS_HOST'),
        port: this.config.get<number>('REDIS_PORT'),
        username: this.config.get<string>('REDIS_USERNAME'),
        password: this.config.get<string>('REDIS_PASSWORD'),
        family: 6,
      })) as unknown as CacheStore,
    };
  }
}
