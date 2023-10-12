import { Injectable, Logger } from '@nestjs/common';
import { TokenOperationRepository } from './token-operation.repository';
import { TokenOperation } from './token-operation.schema';

import { CreateTokenOperationDto } from './dto';
import TransactionsFilters from '@/features/token-operations/models/token-operation.filters.model';
import PaginationParams from '@/common/models/pagination.params.model';

@Injectable()
export class TokenOperationService {
  logger = new Logger();

  constructor(private readonly repository: TokenOperationRepository) {
    this.logger = new Logger(this.constructor.name);
  }

  async create(transaction: CreateTokenOperationDto): Promise<TokenOperation> {
    try {
      return await this.repository.model.create(transaction);
    } catch (e: any) {
      this.logger.error('create_transaction', { error: e.stack });
    }
    return null;
  }

  async findAll(
    filter: TransactionsFilters,
    pagination: PaginationParams,
  ): Promise<TokenOperation[]> {
    let filters = {};

    if (filter.type) {
      filters = {
        type: filter.type,
        ...filters,
      };
    }

    if (filter.sender) {
      filters = {
        sender: filter.sender,
        ...filters,
      };
    }

    if (filter.receiver) {
      filters = {
        receiver: filter.receiver,
        ...filters,
      };
    }

    return this.repository.model
      .find(filters)
      .skip(pagination.skip)
      .limit(pagination.limit);
  }

  async findOneById(id: string): Promise<TokenOperation> {
    return this.repository.model.findOne({ _id: id });
  }
}
