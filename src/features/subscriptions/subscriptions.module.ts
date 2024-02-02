import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TokenOperationModule } from '@/features/token-operations/token-operation.module';

import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionRepository } from './subscription.repository';
import { SubscriptionsEventHandler } from './subscriptions-event.handler';
import { Subscription, SubscriptionSchema } from './subscription.schema';
import { SubscriptionMember, SubscriptionMemberSchema } from './subscription-member.schema';

import { SubscriptionMembersService } from './subscription-members.service';
import { SubscriptionMemberRepository } from './subscription-member.repository';
import { SubscriptionTriggerModule } from '../subscription-triggers/subscription-triggers.module';

@Module({
  imports: [
    SubscriptionTriggerModule,
    TokenOperationModule,
    MongooseModule.forFeature([
      { name: Subscription.name, schema: SubscriptionSchema },
      { name: SubscriptionMember.name, schema: SubscriptionMemberSchema },
    ]),
  ],
  providers: [
    SubscriptionsService, SubscriptionRepository,
    SubscriptionMembersService, SubscriptionMemberRepository,
    SubscriptionsEventHandler
  ],
  exports: [
    SubscriptionsService, SubscriptionRepository,
    SubscriptionMembersService, SubscriptionMemberRepository,
  ],
})
export class SubscriptionsModule {}
