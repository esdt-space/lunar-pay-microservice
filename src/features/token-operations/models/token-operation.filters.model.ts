import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { TokenOperationType } from '../enums';

export default class TokenOperationFilters {
  constructor(init?: Partial<TokenOperationFilters>) {
    Object.assign(this, init);
  }

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  sender?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  receiver?: string;

  @ApiProperty({ required: false, enum: TokenOperationType })
  @IsOptional()
  @IsString()
  type?: TokenOperationType;
}
