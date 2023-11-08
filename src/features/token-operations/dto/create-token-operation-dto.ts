import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateTokenOperationDto {
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  receiver: string;

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

  @IsOptional()
  @IsNotEmpty()
  agreementId: Types.ObjectId;

  @IsString()
  @IsNotEmpty()
  agreementName: string;

  @IsOptional()
  @IsNotEmpty()
  details: string;
}
