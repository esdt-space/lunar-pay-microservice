import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class UpdateAgreementDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsArray()
  @ApiProperty()
  benefits: string[];

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}
