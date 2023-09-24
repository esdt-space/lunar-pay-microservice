import { Module } from '@nestjs/common';

import { BlockchainTokensService } from './tokens.service';

@Module({
  exports: [BlockchainTokensService],
  providers: [BlockchainTokensService],
})
export class MvxTokensModule {}
