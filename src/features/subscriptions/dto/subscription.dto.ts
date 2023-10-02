import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class SubscriptionDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  token: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  inputAmount: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  frequency: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsString()
  @ApiProperty()
  status: string;

  @IsString()
  @ApiProperty()
  ipn: string;

  @IsArray()
  @ApiProperty()
  subscribers: string[];

  @IsArray()
  @ApiProperty()
  transactions: string[];
}