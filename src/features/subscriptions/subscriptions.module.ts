import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TokenOperationModule } from '@/features/token-operations/token-operation.module';

import { SubscriptionsService } from './subscriptions.service';
import { SubscriptionsEventHandler } from './subscriptions-event.handler';

import { SubscriptionMembersService } from './subscription-members.service';
import { SubscriptionTriggerModule } from '../subscription-triggers/subscription-triggers.module';
import { Subscription } from 'rxjs';
import { SubscriptionMember } from './entities';

@Module({
  imports: [
    SubscriptionTriggerModule,
    TokenOperationModule,
    TypeOrmModule.forFeature([Subscription, SubscriptionMember]),
  ],
  providers: [
    SubscriptionsService,
    SubscriptionMembersService,
    SubscriptionsEventHandler
  ],
  exports: [
    SubscriptionsService,
    SubscriptionMembersService,
  ],
})
export class SubscriptionsModule {}
