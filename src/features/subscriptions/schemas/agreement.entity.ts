import { AbstractDocument } from '@/libs/database/mongo';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AgreementType } from '../agreements-types';

@Schema()
export class AgreementEntity extends AbstractDocument {
  @Prop({ type: String })
  owner: string;

  @Prop({ type: Object })
  agreementType: AgreementType;

  @Prop({ type: String })
  tokenNonce?: string;

  @Prop({ type: String })
  tokenIdentifier?: string;

  @Prop({ type: String })
  whitelistEnabled?: string;

  @Prop()
  whitelist?: string[];

  @Prop({ type: String })
  name?: string;

  @Prop({ type: String })
  description?: string;

  @Prop()
  benefits?: string[];

  @Prop({ type: String })
  amount?: string;

  @Prop({ type: String })
  minimumAmount?: string;

  @Prop({ type: String })
  maximumAmount?: string;

  @Prop({ type: String })
  subscriberAmounts?: string;
}

export const AgreementSchema = SchemaFactory.createForClass(AgreementEntity);
