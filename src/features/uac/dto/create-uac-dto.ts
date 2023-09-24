import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateUacDto {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  code: number;
}
