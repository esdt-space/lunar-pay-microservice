import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { VerifiedBy } from '../enums';

@Schema({ ...defaultSchemaOptions, collection: 'esdt-tokens', autoIndex: true })
export class TokenEntity extends AbstractDocument {
  @Prop({ type: String })
  name: string;

  @Prop({ type: String, unique: true, index: true })
  identifier: string;

  @Prop({ type: String })
  ticker: string;

  @Prop({ type: String })
  minted: string;

  @Prop({ type: String })
  burnt: string;

  @Prop({ type: Number })
  decimals: number;

  @Prop({ type: Object })
  assets?: object | null;

  @Prop({ type: String })
  owner: string;

  @Prop({ type: String })
  tokenCollection?: string;

  @Prop({ type: String })
  creator?: string;

  @Prop({ type: String })
  royalties?: string;

  @Prop({ type: Boolean })
  isPaused = false;

  @Prop({ type: Boolean })
  canBurn = false;

  @Prop({ type: Boolean })
  canChangeOwner = false;

  @Prop({ type: Boolean })
  canFreeze = false;

  @Prop({ type: Boolean })
  canMint = false;

  @Prop({ type: Boolean })
  canPause = false;

  @Prop({ type: Boolean })
  canUpgrade = false;

  @Prop({ type: Boolean })
  canWipe = false;

  @Prop({ type: String })
  nonce: string | undefined;

  @Prop({ type: String })
  balance: string | undefined;

  @Prop({ type: Boolean })
  verified = false;

  @Prop({ type: String, enum: VerifiedBy })
  verifiedBy: VerifiedBy | null;

  @Prop({ type: Number })
  price: number | undefined;
}

export const TokenSchema = SchemaFactory.createForClass(TokenEntity);
