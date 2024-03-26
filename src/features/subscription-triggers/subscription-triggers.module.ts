import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubscriptionTriggerService } from './subscription-triggers.service';
import { SubscriptionTrigger } from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([SubscriptionTrigger]),
  ],
  providers: [
    SubscriptionTriggerService
  ],
  exports: [
    SubscriptionTriggerService
  ],
})
export class SubscriptionTriggerModule {}
