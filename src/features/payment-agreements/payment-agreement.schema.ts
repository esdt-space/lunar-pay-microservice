import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';
import { AgreementAmountType, AgreementType } from '@/features/payment-agreements/enums';

@Schema({ ...defaultSchemaOptions, collection: 'payment-agreements' })
export class PaymentAgreement extends AbstractDocument {
  @Prop({ type: String })
  owner: string;

  @Prop({ type: Number })
  agreementIdentifier: number;

  @Prop({ type: String, enum: AgreementType })
  agreementType: AgreementType;

  @Prop({ type: String, enum: AgreementAmountType })
  amountType: AgreementAmountType;

  @Prop({ type: Number })
  tokenNonce: number;

  @Prop({ type: String })
  tokenIdentifier: string;

  @Prop({ type: Number })
  accountsCount: number;


  @Prop({ type: String })
  name?: string;

  @Prop({ type: String })
  description?: string;

  @Prop()
  benefits?: string[];

  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  amount?: string;

  @Prop({ type: String })
  minimumAmount?: string;

  @Prop({ type: String })
  maximumAmount?: string;
}

export const PaymentAgreementSchema = SchemaFactory.createForClass(PaymentAgreement);
