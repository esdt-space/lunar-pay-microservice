import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class UpdateAgreementDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  ownerName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  itemName: string;

  @IsArray()
  @ApiProperty()
  benefits: string[];

  @IsString()
  @IsOptional()
  @ApiProperty()
  content: string;

  @IsString()
  @ApiProperty()
  description: string;

  @IsOptional()
  @IsString()
  signAgreementHttpCallbackUrl: string | undefined;

  @IsOptional()
  @IsString()
  cancelAgreementHttpCallbackUrl: string | undefined;
}
