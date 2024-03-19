import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MvxTokensModule } from '@/libs/blockchain/mvx/token/tokens.module';

/** Local Imports **/
import { Token } from './entities';
import { TokensService } from './tokens.service';
import { TokensCron } from './crons/tokens.cron';
import { TokenEventsHandlerService } from './token-events-handler.service';

@Module({
  imports: [
    MvxTokensModule,
    TypeOrmModule.forFeature([Token]),
  ],
  providers: [
    TokensCron,
    TokensService,
    TokenEventsHandlerService,
  ],
  exports: [TokensService],
})
export class TokensModule {}
