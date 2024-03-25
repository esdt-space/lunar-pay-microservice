import { IsDate, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateAgreementDto {
  @IsNumber()
  @IsNotEmpty()
  owner: string;

  @IsNumber()
  @IsNotEmpty()
  agreementIdentifier: number;

  @IsNumber()
  @IsNotEmpty()
  tokenNonce: number;

  @IsString()
  @IsNotEmpty()
  tokenIdentifier: string;

  @IsNumber()
  @IsNotEmpty()
  agreementType: string;

  @IsNumber()
  @IsNotEmpty()
  amountType: string;

  @IsNumber()
  @IsNotEmpty()
  frequency: number;

  @IsOptional()
  @IsString()
  fixedAmount: string | undefined;
  
  @IsOptional()
  @IsString()
  minimumAmount: string | undefined;
  
  @IsOptional()
  @IsString()
  maximumAmount: string | undefined;

  @IsDate()
  @IsNotEmpty()
  createdAt: Date;
}
