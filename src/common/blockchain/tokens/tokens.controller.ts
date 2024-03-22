import {
  Controller,
  Get,
  Injectable,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

import { DurationConstants } from '@/utils/time/duration-constants';

import { TokensService } from './services/tokens.service';
import { ApiTags } from '@nestjs/swagger';

@Injectable()
@ApiTags('Tokens')
@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Get('esdt')
  // @UseInterceptors(CacheInterceptor)
  // @CacheTTL(DurationConstants.oneMinute())
  async getEsdtTokens() {
    return this.tokensService.findAll();
  }

  @Get('esdt/:identifier')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(DurationConstants.oneMinute())
  async getEsdtTokenByIdentifier(@Param('identifier') identifier: string) {
    return this.tokensService.findOneByIdentifier(identifier);
  }
}
