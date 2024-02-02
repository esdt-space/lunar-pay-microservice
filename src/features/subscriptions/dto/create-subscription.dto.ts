import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNumber()
  @IsNotEmpty()
  owner: string;

  @IsNumber()
  @IsNotEmpty()
  subscriptionIdentifier: number;

  @IsString()
  @IsNotEmpty()
  tokenIdentifier: string;

  @IsNumber()
  @IsNotEmpty()
  tokenNonce: number;

  @IsNumber()
  @IsNotEmpty()
  subscriptionType: number;

  @IsNumber()
  @IsNotEmpty()
  amountType: number;

  @IsNumber()
  @IsNotEmpty()
  frequency: number;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;

  @IsOptional()
  @IsString()
  fixedAmount: string | undefined;

  @IsOptional()
  @IsString()
  minimumAmount: string | undefined;

  @IsOptional()
  @IsString()
  maximumAmount: string | undefined;
}
