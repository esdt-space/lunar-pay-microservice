import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { Subscription } from '../entities';


export class SignedSubscriptionDto {
  constructor(params: Partial<Subscription> = {}){
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
}
