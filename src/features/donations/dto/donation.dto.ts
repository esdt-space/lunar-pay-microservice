import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional, IsNumber, IsDateString } from 'class-validator';
import { Donation } from '../donation.schema';

export class CreateDonationDto {
  constructor(params: Partial<Donation> = {}){
    Object.assign(this, params)
  }

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  beneficiaryName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  donationType: string;
  
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  donationTarget: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  backgroundImageUrl?: string;

  @IsString()
  @IsNotEmpty()
  tokenIdentifier: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fixedAmount: string;
}
