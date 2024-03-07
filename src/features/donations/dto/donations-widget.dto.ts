import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty} from 'class-validator';
import { DonationWidget } from '../donation-widget.schema';

export class CreateDonationWidgetDto {
  constructor(params: Partial<DonationWidget> = {}){
    Object.assign(this, params)
  }

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  receiver: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  metadata: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  codeString: string;
}
