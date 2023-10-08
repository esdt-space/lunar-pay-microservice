import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  tokenID;

  @IsNumber()
  @IsNotEmpty()
  amount;

  @IsString()
  @IsNotEmpty()
  nonce: string;

  @IsString()
  @IsNotEmpty()
  type: string;
}
