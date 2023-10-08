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

  @IsNumber()
  @IsNotEmpty()
  nonce: number;

  @IsString()
  @IsNotEmpty()
  type: string;
}
