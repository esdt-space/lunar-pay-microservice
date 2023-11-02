import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAgreementDto {
  @IsNumber()
  @IsNotEmpty()
  owner: string;

  @IsNumber()
  @IsNotEmpty()
  agreementIdentifier: number;

  @IsString()
  @IsNotEmpty()
  tokenIdentifier: string;

  @IsNumber()
  @IsNotEmpty()
  tokenNonce: number;

  @IsNumber()
  @IsNotEmpty()
  agreementType: number;

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
