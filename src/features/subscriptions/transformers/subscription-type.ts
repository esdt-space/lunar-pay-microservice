import { SubscriptionType } from '@/features/subscriptions/enums';

const map = {
  0: SubscriptionType.RecurringPayoutToSend,
  1: SubscriptionType.RecurringPayoutToReceive,
  2: SubscriptionType.TermRestrictedPayoutToSend,
  3: SubscriptionType.TermRestrictedPayoutToReceive,
};

export function blockchainSubscriptionTypeToApiType(type: number){
  return map[type];
}