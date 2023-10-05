import { AbstractDocument } from '@/libs/database/mongo';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// TO DO Update the Schema with the proper types
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
}

export const AgreementSchema = SchemaFactory.createForClass(AgreementEntity);
