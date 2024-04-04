import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MvxTokensModule } from '@/libs/blockchain/mvx/token/tokens.module';

/** Local Imports **/
import { TokensService } from './services/tokens.service';
import { TokensPriceService } from './services/tokens-price.service';

import { TokensCron } from './crons/tokens.cron';
import { TokenEventsHandlerService } from './token-events-handler.service';
import { Token, TokenPrice } from './entities';
import { AppEventEmitterModule } from '@/libs/events';

@Module({
  imports: [
    AppEventEmitterModule,
    MvxTokensModule,
    TypeOrmModule.forFeature([Token, TokenPrice]),
  ],
  providers: [
    TokensService,
    TokensPriceService,
    TokenEventsHandlerService,
    TokensCron,
  ],
  exports: [TokensService, TokensPriceService],
})
export class TokensModule {}
