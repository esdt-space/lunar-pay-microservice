import {
  Controller,
  Get,
  Injectable,
  Param,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { NativeAuth, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import PaginationParams from '@/common/models/pagination.params.model';

import { TokenOperationService } from './token-operation.service';
import TokenOperationFilters from './models/token-operation.filters.model';
import { MongooseObjectIdPipe } from '@/libs/database/mongo';

@Injectable()
@ApiTags('Token Operations')
@Controller('token-operations')
export class TokenOperationController {
  constructor(private readonly tokenOperationService: TokenOperationService) {}

  @Get()
  @UseGuards(NativeAuthGuard)
  @ApiOperation({
    summary: 'Token Operations list',
    description: 'Returns a list of available token-operations.',
  })
  async list(
    @NativeAuth('address') address: string,
    @Query() filters: TokenOperationFilters,
    @Query() pagination: PaginationParams,
  ) {
    return this.tokenOperationService.findAllAccountTokenOperations(address, filters, pagination);
  }

  @Get(':id/all/charge-operations')
  @UseGuards(NativeAuthGuard)
  @ApiOperation({
    summary: 'Token Operations list',
    description: 'Returns a list of payment agreement charge operations.',
  })
  async getOperationsByParentId(
    @Param('id', MongooseObjectIdPipe) id,
    @Query() pagination: PaginationParams,
  ) {
    return this.tokenOperationService.findChargeTokenOperationsByParentId(id, pagination);
  }
}
