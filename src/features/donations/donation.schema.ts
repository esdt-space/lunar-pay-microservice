import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';

import { RedirectAndWebhooksSettings } from './models/redirect-and-webhooks-settings';
import { DonationTarget, DonationType } from './enums';

@Schema({ ...defaultSchemaOptions, collection: 'donations' })
export class Donation extends AbstractDocument {
  @Prop({ type: String, index: true })
  owner: string;

  @Prop({ type: String, enum: DonationType, index: true })
  donationType: DonationType;

  @Prop({ type: String, enum: DonationTarget, index: true })
  donationTarget: DonationTarget;

  @Prop({ type: String, index: true })
  tokenIdentifier: string;

  @Prop({ type: Number, default: 0 })
  tokenNonce: number;

  @Prop({ type: String })
  beneficiaryName?: string;

  @Prop({ type: String })
  description?: string;

  @Prop({ type: String })
  fixedAmount?: string;

  @Prop({ type: String })
  backgroundImageUrl?: string;

  @Prop({ type: String })
  payDonationHttpCallbackUrl?: string;

  @Prop({ type: String })
  payDonationRedirectUrl?: string;

  @Prop({ type: RedirectAndWebhooksSettings })
  redirectAndWebhookSettings: RedirectAndWebhooksSettings;
}

export const DonationSchema = SchemaFactory.createForClass(Donation);
