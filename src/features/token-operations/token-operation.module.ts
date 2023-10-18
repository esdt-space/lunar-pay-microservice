import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokenOperationService } from './token-operation.service';
import { TokenOperationRepository } from './token-operation.repository';
import { TokenOperationEventHandler } from './token-operation-event.handler';
import { TokenOperationSchema, TokenOperation } from './token-operation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TokenOperation.name, schema: TokenOperationSchema },
    ]),
  ],
  providers: [
    TokenOperationService,
    TokenOperationRepository,
    TokenOperationEventHandler,
  ],
  exports: [TokenOperationService],
})
export class TokenOperationModule {}
