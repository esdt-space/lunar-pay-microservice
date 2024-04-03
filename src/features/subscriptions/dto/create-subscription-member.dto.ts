import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsOptional, IsString } from "class-validator";

export class CreateSubscriptionMemberDto {
  @IsString()
  @IsOptional()
  @ApiProperty()
  member: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  metadata: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  internalSubscriptionId: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  blockchainSubscriptionId: number;

  @IsString()
  @IsOptional()
  @ApiProperty()
  subscriptionType: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  status: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  lastChargedAt: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  lastSuccessfulCharge: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  canceledAt: string;
  
  @IsDate()
  @IsOptional()
  @ApiProperty()
  createdAt: Date;
}
