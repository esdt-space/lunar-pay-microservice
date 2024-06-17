import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';

import PaginationParams from '@/common/models/pagination.params.model';

import TokenOperationFilters from './models/token-operation.filters.model';
import { TokenOperation } from './entities';
import { CreateTokenOperationDto } from './dto';
import { PaginatedResponse } from '@/common/models/paginated-response';

@Injectable()
export class TokenOperationService {
  logger = new Logger();

  constructor(
    @InjectRepository(TokenOperation)  private readonly repository: Repository<TokenOperation>
  ) {
    this.logger = new Logger(this.constructor.name);
  }

  async countUsersTokenOperations() {
    const tokenOperationsCount = await this.repository.query(`
      SELECT
        "userId",
        JSON_AGG(JSON_BUILD_OBJECT('type', type, 'count', count)) AS actions,
        SUM(count) AS "allActions"
      FROM (
        SELECT
          CASE
            WHEN type IN ('deposit', 'transfer', 'payment', 'donation') THEN sender
            ELSE receiver
          END AS "userId",
          type,
          COUNT(*) AS count
        FROM
          token_operation
        GROUP BY
          CASE
            WHEN type IN ('deposit', 'transfer', 'payment', 'donation') THEN sender
            ELSE receiver
          END, type
      ) AS grouped_operations
      GROUP BY
        "userId"
    `);
  
    return tokenOperationsCount.map(row => ({
      userId: row.userId,
      actions: row.actions,
      allActions: parseInt(row.allActions, 10)
    }));
  };

  async findOneById(id: string): Promise<TokenOperation> {
    return this.repository.findOneBy({ id });
  }

  async create(transaction: CreateTokenOperationDto) {
    try {
      const operation = this.repository.create(transaction);

      return await this.repository.save(operation);
    } catch (e) {
      this.logger.error('create_transaction', { error: e.stack });
      return null;
    }
  }

  async findChargeTokenOperationsByParentId(
    id: string, 
    filters: TokenOperationFilters = new TokenOperationFilters(), 
    pagination: PaginationParams = new PaginationParams()
  ) {
    const queryBuilder = this.repository.createQueryBuilder('tokenOperation');
    
    queryBuilder.where('tokenOperation.parentId = :parentId', { parentId: id });

    if(filters.filterByAddress) {
      queryBuilder.andWhere('tokenOperation.sender = :address', { address: filters.filterByAddress });
    }
  
    queryBuilder.orderBy('tokenOperation.createdAt', 'DESC');
    queryBuilder.skip(pagination.skip);
    queryBuilder.take(pagination.limit);
  
    const [operations, total] = await queryBuilder.getManyAndCount();
    
    return new PaginatedResponse<TokenOperation>(operations, total, pagination)
  }

  async findAllTokenOperations(
    filters: TokenOperationFilters = new TokenOperationFilters(), 
    pagination: PaginationParams = new PaginationParams()
  ) {
    const queryBuilder = this.repository.createQueryBuilder('tokenOperation');

    if(filters.parentId) {
      queryBuilder.andWhere('tokenOperation.parentId = :parentId', { parentId: filters.parentId });
    }

    if (filters.type) {
      queryBuilder.andWhere('tokenOperation.type = :type', { type: filters.type });
    }
      
    if(filters.filterByAddress) {
      queryBuilder.andWhere(new Brackets(qb => {
        qb.where('tokenOperation.sender = :address', { address: filters.filterByAddress })
          .orWhere('tokenOperation.receiver = :address', { address: filters.filterByAddress })
      }));
    }

    queryBuilder.orderBy('tokenOperation.createdAt', 'DESC');
    queryBuilder.skip(pagination.skip);
    queryBuilder.take(pagination.limit);
    
    const [allOperations, operationsCount] = await queryBuilder.getManyAndCount();

    return new PaginatedResponse<TokenOperation>(allOperations, operationsCount, pagination)
  }
}
