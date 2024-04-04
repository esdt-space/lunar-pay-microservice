import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsString } from "class-validator";


export class CreateAgreementTriggerDto {
  @IsString()
  @IsNotEmpty()
  agreement: string;

  @IsString()
  @IsNotEmpty()
  txHash: string;

  @IsDate()
  @ApiProperty()
  createdAt: Date;
}
