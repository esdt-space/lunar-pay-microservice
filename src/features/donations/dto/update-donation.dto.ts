import { IsOptional, IsString } from "class-validator";

export class UpdateDonationDto {
  @IsString()
  @IsOptional()
  beneficiaryName?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  backgroundImageUrl?: string;

  @IsString()
  @IsOptional()
  payDonationHttpCallbackUrl?: string;

  @IsString()
  @IsOptional()
  payDonationRedirectUrl?: string;
}
