import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';

@Schema({ ...defaultSchemaOptions, collection: 'uac' })
export class UniqueAgreementIdentifier extends AbstractDocument {
  @Prop({ type: Number, unique: true })
  code: string;

  @Prop({ type: String, index: true })
  address: number;
}

export const UniqueAgreementIdentifierSchema = SchemaFactory.createForClass(
  UniqueAgreementIdentifier,
);
