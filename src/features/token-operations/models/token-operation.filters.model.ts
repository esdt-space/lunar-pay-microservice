import { IsOptional, IsString } from 'class-validator';

import { TokenOperationType } from '../enums/token-operation-type.enum';

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
  type: TokenOperationType;
}
