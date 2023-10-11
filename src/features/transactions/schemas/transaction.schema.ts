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
  sender: string;

  @Prop({ type: String, index: true })
  receiver: string;

  @Prop({ type: String, index: true })
  tokenID: string;

  @Prop({ type: Number })
  amount: number;

  @Prop({ type: Number })
  nonce: number;

  @Prop({ type: String, nullable: true })
  txHash: string;

  @Prop({ type: String, enum: Object.values(TransactionType) })
  type: string;

  @Prop({ type: Boolean, nullable: true })
  isInternal: boolean;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
