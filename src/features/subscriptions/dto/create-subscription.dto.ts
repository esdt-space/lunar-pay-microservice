import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateSubscriptionDto {
  @IsNumber()
  @IsNotEmpty()
  owner: string;

  @IsNumber()
  @IsNotEmpty()
  subscriptionIdentifier: number;

  @IsNumber()
  @IsNotEmpty()
  tokenNonce: number;

  @IsString()
  @IsNotEmpty()
  tokenIdentifier: string;

  @IsString()
  @IsNotEmpty()
  subscriptionType: string;

  @IsString()
  @IsNotEmpty()
  amountType: string;

  @IsNumber()
  @IsNotEmpty()
  frequency: number;

  @IsOptional()
  @IsString()
  fixedAmount: string | undefined;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}
