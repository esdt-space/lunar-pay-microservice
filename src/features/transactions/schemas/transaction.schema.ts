import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { TransactionType } from '@/features/transactions/enums/transaction-type.enum';

@Schema({
  ...defaultSchemaOptions,
  collection: 'transactions',
  autoIndex: true,
})
export class Transaction extends AbstractDocument {
  @Prop({ type: String, index: true })
  address: string;

  @Prop({ type: String, unique: true, index: true })
  tokenID: string;

  @Prop({ type: Number })
  amount: number;

  @Prop({ type: Number })
  nonce: number;

  @Prop({ type: String, enum: Object.values(TransactionType) })
  type: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
