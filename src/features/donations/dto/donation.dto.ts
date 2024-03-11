import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Donation } from '../donation.schema';

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
}
