import { TriggerSubscriptionEventTopics } from '@/events-notifier/events/subscription/topics/trigger-subscription-event.topics';
import { TriggerEvent } from '@/libs/blockchain/mvx/event-decoder';
import { SubscriptionTrigger } from '@/features/subscription-triggers/entities';
import { Subscription, SubscriptionMember } from '@/features/subscriptions/entities';

type MemberInformation = {
  address: string, 
  totalAmount: string
}

export type SubscriptionChargeCreatedEventPayload = {
  agreement: Subscription,
  agreementTrigger: SubscriptionTrigger,
  blockchainEvent: TriggerEvent<TriggerSubscriptionEventTopics>,
  totalAmount: string,
  memberInformation: MemberInformation[]
}

export type SubscriptionMembershipCreatedEventPayload = {
  agreement: Subscription,
  membership: SubscriptionMember
}
