import { ApiTags } from '@nestjs/swagger';
import { Controller, Get, Injectable, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

import { DurationConstants } from '@/utils/time/duration-constants';

import { VaultService } from './vault.service';

@Injectable()
@ApiTags('Protocol - Vault')
@Controller('protocol/vault')
export class VaultController {
  constructor(private readonly vaultService: VaultService) {}

  @Get('tokens-whitelisted')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(DurationConstants.oneSecond() * 10)
  @CacheKey('vault-whitelisted-tokens')
  async getWhitelistedTokens() {
    return this.vaultService.getWhitelistedTokens();
  }

  @Get('addresses-whitelisted')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(DurationConstants.oneSecond() * 10)
  @CacheKey('vault-whitelisted-addresses')
  async getWhitelistedAddresses() {
    return this.vaultService.getWhitelistedAddresses();
  }
}
