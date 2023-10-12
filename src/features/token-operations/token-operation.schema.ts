import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { TokenOperationType } from './enums';

@Schema({ ...defaultSchemaOptions, collection: 'token-operations' })
export class TokenOperation extends AbstractDocument {
  @Prop({ type: String, enum: Object.values(TokenOperationType) })
  type: TokenOperationType;

  @Prop({ type: String, index: true })
  sender: string;

  @Prop({ type: String, index: true })
  receiver: string;

  @Prop({ type: Number })
  amount: number;

  @Prop({ type: Number })
  tokenNonce: number;

  @Prop({ type: String, index: true })
  tokenIdentifier: string;

  @Prop({ type: String, nullable: true })
  txHash: string;

  @Prop({ type: Boolean, nullable: true })
  isInternal: boolean;
}

export const TokenOperationSchema =
  SchemaFactory.createForClass(TokenOperation);
