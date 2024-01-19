import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';

import { RedirectAndWebhooksSettings } from './models/redirect-and-webhooks-settings';
import { AgreementAmountType, AgreementType, AgreementUserFriendlyType } from './enums';

@Schema({ ...defaultSchemaOptions, collection: 'payment-agreements' })
export class PaymentAgreement extends AbstractDocument {
  @Prop({ type: String, index: true })
  owner: string;

  @Prop({ type: Number, index: true, unique: true })
  agreementIdentifier: number;

  @Prop({ type: String, enum: AgreementType, index: true })
  agreementType: AgreementType;

  @Prop({ type: String, enum: AgreementAmountType, index: true })
  amountType: AgreementAmountType;

  @Prop({ type: String, enum: AgreementUserFriendlyType })
  userFriendlyType: AgreementUserFriendlyType;

  @Prop({ type: Number })
  frequency: number;

  @Prop({ type: Number, default: 0 })
  tokenNonce: number;

  @Prop({ type: String, index: true })
  tokenIdentifier: string;

  @Prop({ type: Number, default: 0 })
  accountsCount: number;

  @Prop({ type: Number, default: 0 })
  activeAccountsCount: number;


  @Prop({ type: String })
  ownerName?: string;

  @Prop({ type: String })
  itemName?: string;

  @Prop({ type: String })
  description?: string;

  @Prop()
  benefits?: string[];

  @Prop({ type: String })
  content: string;

  @Prop({ type: String })
  fixedAmount?: string;

  @Prop({ type: String })
  minimumAmount?: string;

  @Prop({ type: String })
  maximumAmount?: string;

  @Prop({ type: String })
  signAgreementHttpCallbackUrl?: string;

  @Prop({ type: String })
  cancelAgreementHttpCallbackUrl?: string;

  @Prop({ type: String })
  signAgreementRedirectUrl?: string;

  @Prop({ type: RedirectAndWebhooksSettings })
  redirectAndWebhookSettings: RedirectAndWebhooksSettings;
}

export const PaymentAgreementSchema = SchemaFactory.createForClass(PaymentAgreement);
