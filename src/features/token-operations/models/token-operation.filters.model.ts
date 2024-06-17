import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { TokenOperationType } from '../enums';

export default class TokenOperationFilters {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  filterByAddress?: string;
  
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  parentId?: string;

  @ApiProperty({ required: false, enum: TokenOperationType })
  @IsOptional()
  @IsString()
  type?: TokenOperationType;
}
