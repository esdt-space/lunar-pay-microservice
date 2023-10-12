import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokenOperationSchema, TokenOperation } from './token-operation.schema';
import { TokenOperationRepository } from './token-operation.repository';
import { TokenOperationService } from './token-operation.service';
import { TokenOperationEventHandler } from '@/features/token-operations/token-operation-event.handler';

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
  exports: [TokenOperationService, TokenOperationEventHandler],
})
export class TokenOperationModule {}
