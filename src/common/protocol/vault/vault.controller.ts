import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Injectable,
  Param,
  UseGuards,
  UseInterceptors
} from '@nestjs/common';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';

import { HttpCacheInterpreter } from '@/libs/caching';
import { DurationConstants } from '@/utils/time/duration-constants';

import { VaultService } from './vault.service';
import { NativeAuth, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';

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

  @Get('account-balances')
  @UseInterceptors(HttpCacheInterpreter)
  @CacheTTL(DurationConstants.oneSecond() * 10)
  @UseGuards(NativeAuthGuard)
  async getAccountBalances(@NativeAuth('address') address: string) {
    return this.vaultService.getAccountBalances(address);
  }

  @Get('subscription-charge-amount/:id')
  @UseInterceptors(HttpCacheInterpreter)
  @CacheTTL(DurationConstants.oneSecond() * 10)
  @UseGuards(NativeAuthGuard)
  async getSubscriptionsChargeAmounts(@Param('id') id: number) {
    return this.vaultService.getSubscriptionChargeAmounts(id);
  }
}
