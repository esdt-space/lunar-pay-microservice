import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransactionSchema, Transaction } from './schemas/transaction.schema';
import { TransactionRepository } from './repositories/transaction.repository';
import { TransactionService } from './services/transaction.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
  providers: [TransactionService, TransactionRepository],
  exports: [
    TransactionService,
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
  ],
})
export class TransactionModule {}
