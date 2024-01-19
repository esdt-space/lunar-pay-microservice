import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class UpdateAgreementDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  ownerName: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty()
  itemName: string;

  @IsArray()
  @IsOptional()
  @ApiProperty()
  benefits: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  content: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsOptional()
  @IsString()
  signAgreementHttpCallbackUrl: string | undefined;

  @IsOptional()
  @IsString()
  cancelAgreementHttpCallbackUrl: string | undefined;

  @IsOptional()
  @IsString()
  signAgreementRedirectUrl: string | undefined;
}
