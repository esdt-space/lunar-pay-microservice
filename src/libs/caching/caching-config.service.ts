import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ioRedisStore } from '@tirke/node-cache-manager-ioredis';
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
      store: ioRedisStore({
        host: this.config.get<string>('REDIS_HOST'),
        port: this.config.get<number>('REDIS_PORT'),
        username: this.config.get<string>('REDIS_USERNAME'),
        password: this.config.get<string>('REDIS_PASSWORD'),
      }) as unknown as CacheStore,
    };
  }
}
