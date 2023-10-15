import { CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class HttpCacheInterpreter extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const httpArgumentsHost = context.switchToHttp();
    const request = httpArgumentsHost.getRequest();
    const address = request.jwt?.address;

    if (!address) return super.trackBy(context);

    return `${request.originalUrl}-${address}`;
  }
}