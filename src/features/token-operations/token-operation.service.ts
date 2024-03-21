import { ObjectId } from 'mongodb';
import { FilterQuery } from 'mongoose';
import { Injectable, Logger } from '@nestjs/common';

import PaginationParams from '@/common/models/pagination.params.model';

import TokenOperationFilters from './models/token-operation.filters.model';
import { TokenOperation } from './entities';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TokenOperationService {
  
  logger = new Logger();

  constructor(
    @InjectRepository(TokenOperation)  private repository: Repository<TokenOperation>
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async findOneById(id: string): Promise<TokenOperation> {
    return this.repository.findOneBy({ id });
  }

  async create(transaction: any) {
    try {
      const op = this.repository.create(transaction);

      return (await this.repository.save(op)).pop();
    } catch (e: any) {
      this.logger.error('create_transaction', { error: e.stack });
      return null;
    }
  }

  async findChargeTokenOperationsByParentId(id: string, pagination: PaginationParams = new PaginationParams()) {
    const queryBuilder = this.repository.createQueryBuilder('tokenOperation');
  
    queryBuilder.where('tokenOperation.parentId = :parentId', { parentId: id });
  
    queryBuilder.leftJoinAndSelect('tokenOperation.agreement', 'agreement');
  
    queryBuilder.orderBy('tokenOperation.id', 'DESC');
  
    queryBuilder.skip(pagination.skip);
    queryBuilder.take(pagination.limit);
  
    const [operations, total] = await queryBuilder.getManyAndCount();
  
    const numberOfPages = Math.ceil(total / pagination.limit);
  
    return {
      numberOfPages: numberOfPages,
      operations: operations,
    };
  }

  async findAllAccountTokenOperations(address: string, filters: TokenOperationFilters = new TokenOperationFilters(), pagination: PaginationParams = new PaginationParams()) {
    const queryBuilder = this.repository.createQueryBuilder('tokenOperation');
  
    queryBuilder.where('(tokenOperation.sender = :address OR tokenOperation.receiver = :address)', { address });
  
    if (filters.type) {
      queryBuilder.andWhere('tokenOperation.type = :type', { type: filters.type });
    }
  
    const [allOperations, operationsCount] = await queryBuilder
      .leftJoinAndSelect('tokenOperation.agreement', 'agreement')
      .orderBy('tokenOperation.id', 'DESC')
      .skip(pagination.skip)
      .take(pagination.limit)
      .getManyAndCount();
  
    const numberOfPages = Math.ceil(operationsCount / pagination.limit);
  
    return {
      numberOfPages,
      operations: allOperations,
    };
  }
}
