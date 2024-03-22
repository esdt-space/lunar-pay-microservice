import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
  agreementTriggerId: string;

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
  agreement: string;

  @IsOptional()
  parentId?: string;

  @IsOptional()
  details: string;
}
