import {
  Controller,
  Get,
  Injectable,
  ParseEnumPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import { TransactionService } from '@/features/transactions/services/transaction.service';
import { TransactionType } from '@/features/transactions/enums/transaction-type.enum';
import TransactionsFilters from '@/features/transactions/models/transactions.filters.model';
import PaginationParams from '@/common/models/pagination.params.model';
import { NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';

@Injectable()
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('all')
  @UseGuards(NativeAuthGuard)
  @ApiOperation({
    summary: 'Transactions list',
    description: 'Returns a list of available transactions on the blockchain.',
  })
  @ApiQuery({
    name: 'sender',
    description: 'Address of the transaction sender',
    required: false,
  })
  @ApiQuery({
    name: 'receiver',
    description: 'Address of the transaction receiver',
    required: false,
  })
  @ApiQuery({
    name: 'type',
    description: 'Type of the transaction (deposit / withdrawal / transfer)',
    required: false,
    enum: TransactionType,
  })
  async list(
    @Query() pagination: PaginationParams,
    @Query('sender') sender?: string,
    @Query('receiver') receiver?: string,
    @Query('type', new ParseEnumPipe(TransactionType)) type?: TransactionType,
  ) {
    return this.transactionService.findAll(
      new TransactionsFilters({
        sender,
        receiver,
        type,
      }),
      pagination,
    );
  }
}
