import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({
  ...defaultSchemaOptions,
  collection: 'transfer-events',
  autoIndex: true,
})
export class TransferEvents extends AbstractDocument {
  @Prop({ type: String, index: true })
  sender: string;

  @Prop({ type: String, index: true })
  receiver: string;

  @Prop({ type: String, unique: true, index: true })
  tokenID: string;

  @Prop({ type: Number })
  amount: number;

  @Prop({ type: Number })
  nonce: number;

  @Prop({ type: Boolean })
  isInternal: boolean;
}

export const TransferEventsSchema =
  SchemaFactory.createForClass(TransferEvents);
