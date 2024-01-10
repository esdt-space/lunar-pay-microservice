import { IsNotEmpty, IsString } from "class-validator";

export class ContactDto {
  @IsString()
  name?: string;
  
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}