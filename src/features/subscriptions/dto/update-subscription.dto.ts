import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class UpdateSubscriptionDto {
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
  signSubscriptionHttpCallbackUrl: string | undefined;

  @IsOptional()
  @IsString()
  cancelSubscriptionHttpCallbackUrl: string | undefined;

  @IsOptional()
  @IsString()
  signSubscriptionRedirectUrl: string | undefined;
}
