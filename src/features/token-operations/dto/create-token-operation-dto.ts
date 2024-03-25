import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTokenOperationDto {
  @IsNumber()
  @IsNotEmpty()
  amount: string;

  @IsNumber()
  @IsNotEmpty()
  tokenNonce: number;

  @IsNumber()
  @IsNotEmpty()
  tokenIdentifier: string;

  @IsString()
  @IsNotEmpty()
  txHash: string;

  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  receiver: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsNumber()
  @IsOptional()
  senderAccountsCount?: number;

  @IsString()
  @IsOptional()
  agreementTriggerId?: string;

  @IsString()
  @IsOptional()
  status?: string;

  @IsBoolean()
  @IsOptional()
  isInternal?: boolean;

  @IsString()
  @IsOptional()
  agreement?: string;

  @IsString()
  @IsOptional()
  parentId?: string;

  @IsString()
  @IsOptional()
  details: string;
}
