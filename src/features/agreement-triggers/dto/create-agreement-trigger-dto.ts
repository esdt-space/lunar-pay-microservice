import { IsNotEmpty, IsString } from "class-validator";


export class CreateAgreementTriggerDto {
  @IsString()
  @IsNotEmpty()
  agreement: string;

  @IsString()
  @IsNotEmpty()
  txHash: string
}
