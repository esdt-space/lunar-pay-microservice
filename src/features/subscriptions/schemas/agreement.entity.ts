import { AbstractDocument } from '@/libs/database/mongo';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AgreementType } from '../agreements-types';

@Schema()
export class AgreementEntity extends AbstractDocument {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String })
  owner: string;

  @Prop()
  benefits: string[];

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  sender?: string;

  @Prop({ type: String })
  receiver?: string;

  @Prop({ type: String })
  senders?: string;

  @Prop({ type: String })
  receivers?: string;

  @Prop({ type: String })
  amountType?: string;

  @Prop({ type: String })
  amount?: string;

  @Prop({ type: String })
  minimumAmount?: string;

  @Prop({ type: String })
  maximumAmount?: string;

  @Prop({ type: String })
  subscriberAmounts?: string;

  @Prop({ type: Object })
  agreementType?: AgreementType;

  @Prop({ type: String })
  token_nonce?: string;

  @Prop({ type: String })
  token_identifier?: string;

  @Prop({ type: String })
  whitelist_enabled?: string;

  @Prop()
  whitelist?: string[];
}

export const AgreementSchema = SchemaFactory.createForClass(AgreementEntity);
