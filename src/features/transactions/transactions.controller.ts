import {
  Controller,
  Get,
  Injectable,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { DurationConstants } from '@/utils/time/duration-constants';
import { TransactionService } from '@/features/transactions/services/transaction.service';
import { NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';

@Injectable()
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('deposit')
  @ApiOperation({
    summary: 'Deposit list',
    description: 'Returns a list of deposits available on the blockchain.',
  })
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(DurationConstants.oneMinute())
  @UseGuards(NativeAuthGuard)
  async getDepositTransactions() {
    return this.transactionService.findAll();
  }

  @Get('withdraw')
  @ApiOperation({
    summary: 'Withdraw list',
    description: 'Returns a list of withdraw available on the blockchain.',
  })
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(DurationConstants.oneMinute())
  @UseGuards(NativeAuthGuard)
  async getWithdrawTransactions() {
    return this.transactionService.findAll();
  }
}
