import { ObjectId } from 'mongodb';
import { FilterQuery } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

import PaginationParams from '@/common/models/pagination.params.model';

import { CreateTokenOperationDto } from './dto';
import { TokenOperation } from './token-operation.schema';
import { TokenOperationRepository } from './token-operation.repository';
import TokenOperationFilters from './models/token-operation.filters.model';

@Injectable()
export class TokenOperationService {
  private static readonly ITEMS_PER_PAGE = 10;
  
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

  async findChargeTokenOperationsByParentId(id: ObjectId, pagination: PaginationParams = new PaginationParams()) {
    const queryFilters = { parentId: id };

    const operationsCount = await this.repository.model.find(queryFilters).countDocuments({});
    const numberOfPages = Math.ceil(operationsCount / pagination.limit);

    const allOperations = this.repository.model
      .find(queryFilters)
      .skip(pagination.skip)
      .limit(pagination.limit)
      .populate('agreement')
      .sort({ _id: 'desc' });

    return {
      numberOfPages: numberOfPages,
      operations: allOperations
    };
  }

  async findAllAccountTokenOperations(address: string, filters: TokenOperationFilters = new TokenOperationFilters(), pagination: PaginationParams = new PaginationParams()) {
    let queryFilters: FilterQuery<TokenOperation> = {};

    if (filters.type) {
      queryFilters.type = filters.type;
    }

    queryFilters = {
      ...queryFilters,
      $or: [
        { sender: address },
        { receiver: address },
      ]
    };

    if (filters.filterByAddress) {
      queryFilters = {
        ...queryFilters,
        $or: [
          { sender: filters.filterByAddress },
          { receiver: filters.filterByAddress },
        ]
      };
    }

    const operationsCount = await this.repository.model.find(queryFilters).countDocuments({});
    const numberOfPages = Math.ceil(operationsCount / pagination.limit);

    const allOperations = await this.repository.model
      .find(queryFilters)
      .skip(pagination.skip)
      .limit(pagination.limit)
      .populate('agreement')
      .sort({ _id: 'desc' });

    return {
      numberOfPages: numberOfPages,
      operations: allOperations
    };
  }

  async findOneById(id: string): Promise<TokenOperation> {
    return this.repository.model.findOne({ _id: id });
  }
}
