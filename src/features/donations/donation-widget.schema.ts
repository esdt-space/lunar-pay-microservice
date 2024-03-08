import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';

@Schema({ ...defaultSchemaOptions, collection: 'donation-widgets' })
export class DonationWidget extends AbstractDocument {
  @Prop({ type: String, index: true })
  owner: string;

  @Prop({ type: String })
  receiver: string;

  @Prop({ type: String })
  donationId: string;

  @Prop({ type: String })
  metadata?: string;

  @Prop({ type: String })
  codeString: string;
}

export const DonationWidgetSchema = SchemaFactory.createForClass(DonationWidget);
