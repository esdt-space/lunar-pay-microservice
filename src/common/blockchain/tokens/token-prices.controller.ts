import { ApiTags } from '@nestjs/swagger';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { Controller, Get, Injectable, UseInterceptors } from '@nestjs/common';

import { DurationConstants } from '@/utils/time/duration-constants';

import { TokensPriceService } from './services/tokens-price.service';

@Injectable()
@ApiTags('Tokens')
@Controller('token-prices')
export class TokenPricesController {
  constructor(private readonly service: TokensPriceService) {}

  @Get('esdt')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(DurationConstants.oneMinute())
  async getEsdtTokens() {
    return this.service.findAll();
  }
}
