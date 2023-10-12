import { FilterQuery } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

import PaginationParams from '@/common/models/pagination.params.model';

import { CreateTokenOperationDto } from './dto';
import { TokenOperation } from './token-operation.schema';
import { TokenOperationRepository } from './token-operation.repository';
import TokenOperationFilters from './models/token-operation.filters.model';

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

  async findAllAccountTokenOperations(address: string, filters: TokenOperationFilters, pagination: PaginationParams) {
    let queryFilters: FilterQuery<TokenOperation> = {};

    if (filters.type) {
      queryFilters.type = filters.type;
    }

    if (filters.sender) {
      queryFilters.sender = filters.sender;
    }

    if (filters.receiver) {
      queryFilters.receiver = filters.receiver;
    }

    queryFilters = {
      ...queryFilters,
      $or: [
        { sender: address },
        { receiver: address },
      ]
    };

    return this.repository.model
      .find(queryFilters)
      .skip(pagination.skip)
      .limit(pagination.limit);
  }

  async findOneById(id: string): Promise<TokenOperation> {
    return this.repository.model.findOne({ _id: id });
  }
}
