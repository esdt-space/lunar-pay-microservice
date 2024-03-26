import { PickType } from '@nestjs/swagger';
import { SubscriptionMember } from '@/features/subscriptions/subscription-member.schema';

export class CreateSubscriptionMemberDto extends PickType(
  SubscriptionMember,
  ['member', 'internalSubscriptionId', 'blockchainSubscriptionId', 'subscriptionType', 'createdAt']
) {}
