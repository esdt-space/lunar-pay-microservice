import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';
import { Types } from 'mongoose';
import { Subscription } from 'rxjs';

// TO DO Update the Schema with the proper types
@Schema({
  ...defaultSchemaOptions,
  collection: 'lunar-pay-subscriptions',
  autoIndex: true,
})
export class SubscriptionEntity extends AbstractDocument {
  @Type(() => String)
  @Prop({ type: Types.ObjectId, ref: Subscription.name })
  @ApiProperty({ type: String })
  @Exclude()
  subscriptionId: Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  token: string;

  @Prop()
  inputAmount: string;

  @Prop()
  frequency: string;

  @Prop()
  description: string;

  @Prop()
  status: string; // success / reject

  @Prop()
  ipn: string;

  @Prop()
  subscribers: string[];

  @Prop()
  transactions: string[];
}

export const SunscriptionSchema =
  SchemaFactory.createForClass(SubscriptionEntity);
