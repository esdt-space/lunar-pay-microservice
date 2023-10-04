import { AbstractDocument } from '@/libs/database/mongo';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// TO DO Update the Schema with the proper types
@Schema()
export class SubscriptionEntity extends AbstractDocument {
  @Prop({ type: String })
  name: string;

  @Prop()
  token: string;

  @Prop()
  inputAmount: string;

  @Prop()
  frequency: string;

  @Prop({ type: String })
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
