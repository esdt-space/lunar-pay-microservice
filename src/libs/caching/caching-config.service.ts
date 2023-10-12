import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CacheModuleOptions,
  CacheOptionsFactory,
  CacheStore,
} from '@nestjs/cache-manager';
import { ioRedisStore } from '@tirke/node-cache-manager-ioredis';

@Injectable()
export class CacheConfigService implements CacheOptionsFactory {
  constructor(private readonly config: ConfigService) {}

  async createCacheOptions(): Promise<CacheModuleOptions> {
    return {
      ttl: 5,
      store: (ioRedisStore({
        host: this.config.get<string>('REDIS_HOST'),
        port: this.config.get<number>('REDIS_PORT'),
        username: this.config.get<string>('REDIS_USERNAME'),
        password: this.config.get<string>('REDIS_PASSWORD'),
        family: this.config.get<number>('REDIS_FAMILY'),
      })) as unknown as CacheStore,
    };
  }
}
