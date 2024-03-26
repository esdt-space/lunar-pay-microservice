import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';

import { RedirectAndWebhooksSettings } from './models/redirect-and-webhooks-settings';
import { SubscriptionAmountType,  SubscriptionType } from './enums';

@Schema({ ...defaultSchemaOptions, collection: 'subscriptions' })
export class Subscription extends AbstractDocument {
  @Prop({ type: String, index: true })
  owner: string;

  @Prop({ type: Number, index: true, unique: true })
  subscriptionIdentifier: number;

  @Prop({ type: String, enum: SubscriptionType, index: true })
  subscriptionType: SubscriptionType;

  @Prop({ type: String, enum: SubscriptionAmountType, index: true })
  amountType: SubscriptionAmountType;

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
  signSubscriptionHttpCallbackUrl?: string;

  @Prop({ type: String })
  cancelSubscriptionHttpCallbackUrl?: string;

  @Prop({ type: String })
  signSubscriptionRedirectUrl?: string;

  @Prop({ type: RedirectAndWebhooksSettings })
  redirectAndWebhookSettings: RedirectAndWebhooksSettings;
}

export const SubscriptionSchema = SchemaFactory.createForClass(Subscription);
