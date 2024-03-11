import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional} from 'class-validator';
import { DonationWidget } from '../donation-widget.schema';

export class CreateDonationWidgetDto {
  constructor(params: Partial<DonationWidget> = {}){
    Object.assign(this, params)
  }

  @IsString()
  @IsOptional()
  @ApiProperty()
  receiver?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  donationId: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  metadata?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  codeString: string;
}
