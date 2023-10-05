import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

// TO DO Update the dto with the proper types
export class AgreementDto {
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
