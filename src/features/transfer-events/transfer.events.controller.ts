import {
  Controller,
  Get,
  Injectable,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { DurationConstants } from '@/utils/time/duration-constants';
import { TransactionService } from '@/features/transactions/services/transaction.service';
import { NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';

@Injectable()
@ApiTags('TransferEvents')
@Controller('transfer-events')
export class TransferEventsController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(DurationConstants.oneMinute())
  @UseGuards(NativeAuthGuard)
  async getTransferEvents() {
    return this.transactionService.findAll();
  }
}
