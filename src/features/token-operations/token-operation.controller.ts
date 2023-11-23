import {
  Controller,
  Get,
  Injectable,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { NativeAuth, NativeAuthGuard } from '@multiversx/sdk-nestjs-auth';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

import PaginationParams from '@/common/models/pagination.params.model';

import { TokenOperationService } from './token-operation.service';
import TokenOperationFilters from './models/token-operation.filters.model';

@Injectable()
@ApiTags('Token Operations')
@Controller('token-operations')
export class TokenOperationController {
  constructor(private readonly tokenOperationService: TokenOperationService) {}

  @Get('all')
  @UseGuards(NativeAuthGuard)
  @ApiOperation({
    summary: 'Token Operations list',
    description: 'Returns a list of available token-operations.',
  })
  async list(
    @NativeAuth('address') address: string,
    @Query(new ValidationPipe({ transform: true })) filters: TokenOperationFilters,
    @Query(new ValidationPipe({ transform: true })) pagination: PaginationParams,
  ) {
    return this.tokenOperationService.findAllAccountTokenOperations(address, filters, pagination);
  }
}
