import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { SubscriptionTrigger, SubscriptionTriggerSchema } from './subscription-trigger.schema';
import { SubscriptionTriggerRepository } from './subscription-trigger.repository';
import { SubscriptionTriggerService } from './subscription-triggers.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriptionTrigger.name, schema: SubscriptionTriggerSchema },
    ]),
  ],
  providers: [
    SubscriptionTriggerRepository,
    SubscriptionTriggerService
  ],
  exports: [
    SubscriptionTriggerRepository,
    SubscriptionTriggerService
  ],
})
export class SubscriptionTriggerModule {}
