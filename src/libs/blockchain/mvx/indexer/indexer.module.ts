import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { IndexerService, AccountTokensIndex } from './services';

@Module({
  imports: [HttpModule],
  exports: [AccountTokensIndex, IndexerService],
  providers: [AccountTokensIndex, IndexerService],
})
export class IndexerModule {}
