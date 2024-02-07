import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTokenOperationDto {
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsNumber()
  @IsNotEmpty()
  senderAccountsCount: number;

  @IsString()
  @IsNotEmpty()
  receiver: string;

  @IsString()
  @IsNotEmpty()
  subscriptionTriggerId: Types.ObjectId;

  @IsString()
  @IsOptional()
  status?: string;

  @IsNumber()
  @IsNotEmpty()
  amount: string;

  @IsNumber()
  @IsNotEmpty()
  tokenIdentifier: string;

  @IsNumber()
  @IsNotEmpty()
  tokenNonce: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  txHash: string;

  @IsBoolean()
  isInternal?: boolean;

  @IsNotEmpty()
  subscription: Types.ObjectId;

  @IsOptional()
  parentId?: Types.ObjectId;

  @IsOptional()
  details: string;
}
