import { IsNotEmpty, IsString } from "class-validator";

export class EmailDto {
  @IsString()
  name?: string;
  
  @IsString()
  template?: string;

  @IsString()
  @IsNotEmpty()
  to: string;

  @IsString()
  @IsNotEmpty()
  from: string;

  @IsString()
  @IsNotEmpty()
  context: Record<string, unknown>
}