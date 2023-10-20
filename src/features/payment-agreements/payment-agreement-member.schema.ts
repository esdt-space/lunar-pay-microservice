import { Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';
import { AgreementMemberStatus, AgreementType } from '@/features/payment-agreements/enums';

@Schema({ ...defaultSchemaOptions, collection: 'payment-agreement-members' })
export class PaymentAgreementMember extends AbstractDocument {
  @Prop({ type: String, index: true })
  member: string;

  @Prop({ type: Types.ObjectId, index: true })
  internalAgreementId: Types.ObjectId;

  @Prop({ type: Number, index: true })
  blockchainAgreementId: number;

  @Prop({ type: String, enum: AgreementType, index: true })
  agreementType: AgreementType;

  @Prop({ type: String, enum: AgreementMemberStatus, default: AgreementMemberStatus.Active })
  status: AgreementMemberStatus;

  @Prop({ type: Date })
  lastChargedAt: Date;

  @Prop({ type: Date })
  canceledAt: Date;
}

export const PaymentAgreementMemberSchema = SchemaFactory.createForClass(PaymentAgreementMember);
