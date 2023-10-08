import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTransferEventsDto {
  @IsString()
  @IsNotEmpty()
  sender: string;

  @IsString()
  @IsNotEmpty()
  receiver: string;

  @IsNumber()
  @IsNotEmpty()
  amount;

  @IsNumber()
  @IsNotEmpty()
  tokenID;

  @IsNumber()
  @IsNotEmpty()
  nonce: number;

  @IsNotEmpty()
  @IsBoolean()
  isInternal: boolean;
}
