import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';
import { SubscriptionMemberStatus, SubscriptionType } from '@/features/subscriptions/enums';

@Schema({ ...defaultSchemaOptions, collection: 'subscription-members' })
export class SubscriptionMember extends AbstractDocument {
  @Prop({ type: String, index: true })
  member: string;

  @Prop({ type: Types.ObjectId, index: true })
  internalSubscriptionId: Types.ObjectId;

  @Prop({ type: Number, index: true })
  blockchainSubscriptionId: number;

  @Prop({ type: String, enum: SubscriptionType, index: true })
  subscriptionType: SubscriptionType;

  @Prop({ type: String, enum: SubscriptionMemberStatus, default: SubscriptionMemberStatus.Active })
  status: SubscriptionMemberStatus;

  @Prop({ type: Date })
  lastChargedAt: Date;
  
  @Prop({ type: Date })
  lastSuccessfulCharge: Date;

  @Prop({ type: Date })
  canceledAt: Date;
}

export const SubscriptionMemberSchema = SchemaFactory.createForClass(SubscriptionMember);
