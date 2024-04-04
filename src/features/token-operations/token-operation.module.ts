import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenOperationService } from './token-operation.service';
import { TokenOperationEventHandler } from './token-operation-event.handler';
import { TokenOperation } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([TokenOperation]),
  ],
  providers: [
    TokenOperationService,
    TokenOperationEventHandler,
  ],
  exports: [TokenOperationService],
})
export class TokenOperationModule {}
