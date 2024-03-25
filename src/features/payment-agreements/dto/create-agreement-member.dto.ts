import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateAgreementMemberDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  member: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  internalAgreementId: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  blockchainAgreementId: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  agreementType: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  status: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  lastChargedAt: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  lastSuccessfulCharge: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  canceledAt: string;
  
  @IsString()
  @IsOptional()
  @ApiProperty()
  createdAt: string;
}
