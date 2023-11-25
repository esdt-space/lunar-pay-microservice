import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';
import { PaymentAgreement } from '../payment-agreements/payment-agreement.schema';

import { TokenOperationStatus, TokenOperationType } from './enums';

@Schema({ ...defaultSchemaOptions, collection: 'token-operations' })
export class TokenOperation extends AbstractDocument {
  @Prop({ type: String, enum: Object.values(TokenOperationType) })
  type: TokenOperationType;

  @Prop({ type: String, index: true, nullable: true })
  sender: string;

  @Prop({ type: Number, nullable: true })
  senderAccountsCount: number;

  @Prop({ type: String, index: true, nullable: true  })
  receiver: string;

  @Prop({ type: String, nullable: true })
  agreementTriggerId: string;

  @Prop({ type: String })
  status?: TokenOperationStatus;

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

  @Prop({ type: Types.ObjectId, ref: PaymentAgreement.name })
  agreement?: Types.ObjectId;

  @Prop({ type: Types.ObjectId, nullable: true })
  parentId?: Types.ObjectId;

  @Prop({ type: String })
  details?: string;
}

export const TokenOperationSchema =
  SchemaFactory.createForClass(TokenOperation);
