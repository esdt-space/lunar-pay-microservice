import { Connection, Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';

import { AbstractRepository } from '@/libs/database/mongo';

import { Transaction } from '../schemas/transaction.schema';

@Injectable()
export class TransactionRepository extends AbstractRepository<Transaction> {
  constructor(
    @InjectConnection() connection: Connection,
    @InjectModel(Transaction.name) public model: Model<Transaction>,
  ) {
    super(model, connection);
  }
}
