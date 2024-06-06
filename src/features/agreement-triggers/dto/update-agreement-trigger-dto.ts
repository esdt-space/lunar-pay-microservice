import { IsOptional, IsString } from "class-validator";

export class UpdateAgreementTriggerDto {
  @IsString()
  @IsOptional()
  successfulChargeAmount?: string;

  @IsString()
  @IsOptional()
  failedChargeAmount?: string;

  @IsString()
  @IsOptional()
  successfulCycles?: number;

  @IsString()
  @IsOptional()
  failedCycles?: number;
}
