import {
  IsBoolean,
  IsEmpty,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  receiver: string;

  @IsNumber()
  @IsNotEmpty()
  tokenID;

  @IsNumber()
  @IsNotEmpty()
  amount;

  @IsNumber()
  @IsNotEmpty()
  nonce: number;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  txHash: string;

  @IsBoolean()
  isInternal?: boolean;
}
