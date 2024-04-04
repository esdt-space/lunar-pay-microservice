import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class UpdateAgreementDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  ownerName: string;

  @IsString()
  @IsOptional()
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
