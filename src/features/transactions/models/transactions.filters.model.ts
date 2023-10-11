import { IsOptional, IsString } from 'class-validator';

import { TransactionType } from '@/features/transactions/enums/transaction-type.enum';

export default class TransactionsFilters {
  constructor(init?: Partial<TransactionsFilters>) {
    Object.assign(this, init);
  }

  @IsString()
  @IsOptional()
  sender?: string;
  @IsOptional()
  @IsString()
  receiver?: string;
  @IsString()
  type: TransactionType;
}
