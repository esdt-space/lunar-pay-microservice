import { Injectable, Logger } from '@nestjs/common';
import { TransactionRepository } from '../repositories/transaction.repository';
import { Transaction } from '../schemas/transaction.schema';

import { CreateTransactionDto } from '../dto';

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
  async findAll(): Promise<Transaction[]> {
    return this.repository.model.find();
  }

  async findOneById(id: string): Promise<Transaction> {
    return this.repository.model.findOne({ _id: id });
  }
}
