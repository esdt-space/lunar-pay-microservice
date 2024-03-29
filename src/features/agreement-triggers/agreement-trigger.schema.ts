import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

@Schema({ ...defaultSchemaOptions, collection: 'agreement-triggers' })
export class AgreementTrigger extends AbstractDocument {
  @Prop({ type: Types.ObjectId })
  agreement: Types.ObjectId;

  @Prop({ type: String, default: '0'  })
  successfulChargeAmount: string;

  @Prop({ type: String, default: 0 })
  successfulAccountsCount: number;

  @Prop({ type: String, default: '0'   })
  failedChargeAmount: string;

  @Prop({ type: String, default: 0 })
  failedAccountsCount: number;
  
  @Prop({ type: String })
  txHash: string;
}

export const AgreementTriggerSchema = SchemaFactory.createForClass(AgreementTrigger);
