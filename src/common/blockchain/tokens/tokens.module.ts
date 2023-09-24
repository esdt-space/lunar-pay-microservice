import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MvxTokensModule } from '@/libs/blockchain/mvx/token/tokens.module';

/** Local Imports **/
import { TokensService } from './services/tokens.service';
import { TokensPriceService } from './services/tokens-price.service';

import { TokenEntity, TokenSchema } from './schemas/token.entity';
import {
  TokenPriceEntity,
  TokenPriceSchema,
} from './schemas/token.price.entity';

import { TokensCron } from './crons/tokens.cron';
import { TokenRepository } from './repositories/token.repository';
import { TokenPricesRepository } from './repositories/token.prices.repository';
import { TokenEventsHandlerService } from './token-events-handler.service';

@Module({
  imports: [
    MvxTokensModule,
    MongooseModule.forFeature([
      { name: TokenEntity.name, schema: TokenSchema },
      { name: TokenPriceEntity.name, schema: TokenPriceSchema },
    ]),
  ],
  providers: [
    TokensService,
    TokensPriceService,
    TokenRepository,
    TokenPricesRepository,
    TokenEventsHandlerService,
    TokensCron,
  ],
  exports: [TokensService, TokensPriceService],
})
export class TokensModule {}
