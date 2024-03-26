import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSubscriptionTriggerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  subscription: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  txHash?: string
}
