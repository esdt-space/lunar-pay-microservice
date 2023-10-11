import { Injectable, Logger } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { Transaction } from '../schemas/transaction.schema';

import { CreateTransactionDto } from '../dto';
import TransactionsFilters from '@/features/transactions/models/transactions.filters.model';
import PaginationParams from '@/common/models/pagination.params.model';

@Injectable()
export class TransactionService {
  logger = new Logger();

  constructor(private readonly repository: TransactionRepository) {
    this.logger = new Logger(this.constructor.name);
  }

  async create(transaction: CreateTransactionDto): Promise<Transaction> {
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
  ): Promise<Transaction[]> {
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

  async findOneById(id: string): Promise<Transaction> {
    return this.repository.model.findOne({ _id: id });
  }
}
