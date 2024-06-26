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

import { PaymentAgreementsModule } from '@/features/payment-agreements/payment-agreements.module';
import { PaymentAgreementsController } from '@/features/payment-agreements/payment-agreements.controller';
import { VaultController } from '@/common/protocol/vault/vault.controller';
import { VaultModule } from '@/common/protocol/vault/vault.module';
import { TokenOperationModule } from '@/features/token-operations/token-operation.module';
import { DonationsModule } from './features/donations/donations.module';
import { PaymentsModule } from './features/payment/payment.module';
import { TokenOperationController } from '@/features/token-operations/token-operation.controller';
import { EventsNotifierModule } from '@/events-notifier';
import { AgreementTriggerModule } from './features/agreement-triggers/agreement-triggers.module';
import { SubscriptionTriggerModule } from './features/subscription-triggers/subscription-triggers.module';
import { SubscriptionsModule } from './features/subscriptions/subscriptions.module';
import { AgreementTriggersController } from './features/agreement-triggers/agreement-triggers.controller';
import { EmailServiceModule } from './features/email/email.module';
import { ContactController } from './features/email/email.controller';
import { DonationsController } from './features/donations/donations.controller';
import { EventController } from './features/event/event.controller';
import { EventModule } from './features/event/event.module';
import { SubscriptionsController } from './features/subscriptions/subscriptions.controller';
import { SubscriptionTriggersController } from './features/subscription-triggers/subscription-triggers.controller';

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

    AgreementTriggerModule,
    PaymentAgreementsModule,
    DonationsModule,
    SubscriptionTriggerModule,
    SubscriptionsModule,
    TokenOperationModule,
    PaymentsModule,

    EmailServiceModule,

    VaultModule,
    EventsNotifierModule,

    EventModule,
  ],
  controllers: [
    AccountController,
    TokensController,
    TokenPricesController,

    AgreementTriggersController,
    PaymentAgreementsController,
    DonationsController,
    SubscriptionTriggersController,
    SubscriptionsController,
    TokenOperationController,

    ContactController,

    VaultController,

    EventController,
  ],
})
export default class AppModule {}
