import { ObjectId } from 'mongodb';
import { FilterQuery, Model } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

import PaginationParams from '@/common/models/pagination.params.model';

import { CreateTokenOperationDto } from './dto';
import { TokenOperation } from './token-operation.schema';
import { TokenOperationRepository } from './token-operation.repository';
import TokenOperationFilters from './models/token-operation.filters.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class TokenOperationService {
  logger = new Logger();

  constructor(
    private readonly repository: TokenOperationRepository,
    @InjectModel('TokenOperation') private readonly tokenOperationModel: Model<TokenOperation>
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async countUsersTokenOperations() {
    const tokenOperationsCount = await this.tokenOperationModel.aggregate([
      {
        $addFields: {
          userId: {
            $cond: {
              if: { $in: ['$type', ['deposit', 'transfer', 'payment', 'donation']] },
              then: '$sender',
              else: '$receiver'
            }
          }
        },
      },
      { 
        $group: {
          _id: {
            userId: '$userId',
            type: '$type'
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: '$_id.userId',
          actions: {
            $push: {
              type: '$_id.type',
              count: '$count',
            },
          },
        },
      },
    ]);

    return tokenOperationsCount
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
