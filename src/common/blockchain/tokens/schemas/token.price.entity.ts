import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';

@Schema({ ...defaultSchemaOptions, collection: 'esdt-tokens-prices' })
export class TokenPriceEntity extends AbstractDocument {
  @Prop({ type: String, unique: true })
  identifier: string;

  @Prop({ type: Number })
  price: number;

  @Prop({ type: String, enum: ['MaiarExchange'], default: 'MaiarExchange' })
  source: string;
}

export const TokenPriceSchema = SchemaFactory.createForClass(TokenPriceEntity);
