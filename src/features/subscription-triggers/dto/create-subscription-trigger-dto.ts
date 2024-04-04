import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateSubscriptionTriggerDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  subscription: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  txHash?: string

  @IsDate()
  @ApiProperty()
  createdAt: Date;
}
