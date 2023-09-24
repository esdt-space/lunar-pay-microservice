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
  ],
  controllers: [],
})
export default class AppModule {}
