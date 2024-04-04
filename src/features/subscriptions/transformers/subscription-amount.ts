import { SubscriptionAmountType } from '@/features/subscriptions/enums';

const map = {
  0: SubscriptionAmountType.FixedAmount,
  1: SubscriptionAmountType.AnyAmount,
  2: SubscriptionAmountType.BoundedAmount,
  3: SubscriptionAmountType.SenderDefinedFixedAmount,
  4: SubscriptionAmountType.SenderDefinedBoundedAmount,
  5: SubscriptionAmountType.CreatorDefinedFixedAmountPerReceiver,
  6: SubscriptionAmountType.CreatorDefinedBoundedAmountPerReceiver,
};

export function blockchainSubscriptionAmountTypeToApiType(type: number){
  return map[type];
}