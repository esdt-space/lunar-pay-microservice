import { TriggerSubscriptionEvent } from '@/events-notifier/events';
import { SubscriptionTrigger } from '@/features/subscription-triggers/entities';
import { Subscription, SubscriptionMember } from '@/features/subscriptions/entities';

type MemberInformation = {
  address: string, 
  totalAmount: string
}

export type SubscriptionChargeCreatedEventPayload = {
  agreement: Subscription,
  agreementTrigger: SubscriptionTrigger,
  blockchainEvent: TriggerSubscriptionEvent,
  totalAmount: string,
  memberInformation: MemberInformation[]
}

export type SubscriptionMembershipCreatedEventPayload = {
  agreement: Subscription,
  membership: SubscriptionMember
}
