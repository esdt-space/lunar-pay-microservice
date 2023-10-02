import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SubscriptionEntity,
  SunscriptionSchema,
} from './schemas/subscription.entity';
import { SubscriptionsService } from './services/subscriptions.service';
import { SubscriptionRepository } from './repositories/subscription.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SubscriptionEntity.name, schema: SunscriptionSchema },
    ]),
  ],
  providers: [SubscriptionsService, SubscriptionRepository],
  exports: [SubscriptionsService, SubscriptionRepository],
})
export class SubscriptionsModule {}
