import {
  Controller,
  Get,
  Injectable,
  ParseEnumPipe,
  Query,
  UseGuards,
} from '@nestjs/common';
import { NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';

import PaginationParams from '@/common/models/pagination.params.model';

import { TokenOperationService } from './token-operation.service';
import { TokenOperationType } from './enums/token-operation-type.enum';
import TransactionsFilters from './models/token-operation.filters.model';

@Injectable()
@ApiTags('Token Operations')
@Controller('token-operations')
export class TokenOperationController {
  constructor(private readonly transactionService: TokenOperationService) {}

  @Get('all')
  @UseGuards(NativeAuthGuard)
  @ApiOperation({
    summary: 'Transactions list',
    description:
      'Returns a list of available token-operations on the blockchain.',
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
    enum: TokenOperationType,
  })
  async list(
    @Query() pagination: PaginationParams,
    @Query('sender') sender?: string,
    @Query('receiver') receiver?: string,
    @Query('type', new ParseEnumPipe(TokenOperationType))
    type?: TokenOperationType,
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
