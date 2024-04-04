import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional, IsDate } from 'class-validator';
import { Donation } from '../entities';

export class CreateDonationDto {
  constructor(params: Partial<Donation> = {}){
    Object.assign(this, params)
  }

  @IsString()
  @IsOptional()
  @ApiProperty()
  beneficiaryName?: string;

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
  @IsOptional()
  @IsNotEmpty()
  tokenIdentifier?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  fixedAmount?: string;

  @IsDate()
  @ApiProperty()
  createdAt: Date;
}
