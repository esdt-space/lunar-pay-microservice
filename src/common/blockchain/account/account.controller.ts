import { ApiTags } from '@nestjs/swagger';
import {
  Controller,
  Get,
  Injectable,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

import { DurationConstants } from '@/utils/time/duration-constants';
import { NativeAuth, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';

import { AccountTokensService } from './account-tokens.service';
import { RolesGuard } from '@/core/auth/guards';

@Injectable()
@ApiTags('Account')
@Controller('account')
export class AccountController {
  constructor(private readonly accountTokensService: AccountTokensService) {}

  @Get('tokens/esdt')
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(DurationConstants.oneSecond() * 20)
  @UseGuards(RolesGuard)
  @UseGuards(NativeAuthGuard)
  async getEsdtTokens(@NativeAuth('address') address: string) {
    return this.accountTokensService.getEsdtTokens(address);
  }
}
