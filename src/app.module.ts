import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { validate } from '@/config/validation';
import { CachingModule } from '@/libs/caching';
import { AppEventEmitterModule } from '@/libs/events';
import { DatabaseProvidersModule } from '@/libs/database';
import { NativeAuthModule } from '@/libs/security/native-auth';

import configuration from '../config/configuration';
import { BlockchainEventsNotifierModule } from '@/libs/blockchain/mvx/events-notifier';

import { AccountModule } from '@/common/blockchain/account/account.module';
import { TokensModule } from '@/common/blockchain/tokens/tokens.module';
import { TokensController } from '@/common/blockchain/tokens/tokens.controller';
import { AccountController } from '@/common/blockchain/account/account.controller';
import { TokenPricesController } from '@/common/blockchain/tokens/token-prices.controller';

import { UacController } from '@/features/uac';
import { UacModule } from '@/features/uac/uac.module';
import { SubscriptionsModule } from '@/features/subscriptions/subscriptions.module';
import { SubscriptionsController } from '@/features/subscriptions/subscriptions.controller';
import { VaultController } from '@/common/protocol/vault/vault.controller';
import { VaultModule } from '@/common/protocol/vault/vault.module';

@Module({
  imports: [
    /** Common Modules **/
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      validate,
      isGlobal: true,
      load: [configuration],
    }),

    CachingModule,
    AppEventEmitterModule,
    DatabaseProvidersModule,
    BlockchainEventsNotifierModule,

    NativeAuthModule,

    AccountModule,
    TokensModule,

    UacModule,
    SubscriptionsModule,

    VaultModule,
  ],
  controllers: [
    AccountController,
    TokensController,
    TokenPricesController,

    UacController,
    SubscriptionsController,

    VaultController,
  ],
})
export default class AppModule {}
