import { Cache } from 'cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class CachingService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getKey<T = unknown>(key: string): Promise<T> {
    return await this.cacheManager.get(key);
  }

  async setKey(key: string, value: unknown, ttl?: number): Promise<void> {
    return await this.cacheManager.set(key, value, ttl);
  }

  async deleteKey(key: string): Promise<void> {
    await this.cacheManager.del(key);
  }

  async resetCache(): Promise<void> {
    await this.cacheManager.reset();
  }
}
