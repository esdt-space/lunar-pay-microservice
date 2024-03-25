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
  successfulAccountsCount?: number;

  @IsString()
  @IsOptional()
  failedAccountsCount?: number;
}
