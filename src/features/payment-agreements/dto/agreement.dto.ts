import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { PaymentAgreement } from '../entities';

export class AgreementDto {
  constructor(params: Partial<PaymentAgreement> = {}){
    Object.assign(this, params)
  }

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  itemName: string;

  @IsString()
  @IsNotEmpty()
  tokenIdentifier: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  benefits: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  content?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  frequency: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  accountsCount: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fixedAmount: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiProperty()
  createdAt: Date;

  @IsString()
  @IsOptional()
  @ApiProperty()
  signAgreementRedirectUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  signAgreementHttpCallbackUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  cancelAgreementHttpCallbackUrl?: string;
}
