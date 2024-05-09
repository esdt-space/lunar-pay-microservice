import BigNumber from "bignumber.js";

type ChargeOperationValue = [string, number] | null;

export type SubscriptionMultiChargeResult = {
  account: string;
  data: [ChargeOperationValue, ChargeOperationValue];
}

export type TriggerSubscriptionParseEvent = {
  id: BigNumber,
  timestamp: BigNumber,
  data: SubscriptionMultiChargeResult[],
}

export type TriggerSubscriptionParsedEventResult = {
  subscriptionId: number;
  createdAt: number;
  data: SubscriptionMultiChargeResult[];
}

export type SignSubscriptionParsedEventResult = {
  eventName: string;
  subscriptionId: number;
  address: string;
  signedAt: Date;
}

// Cancel Subscription
export type CancelSubscriptionResult = {
  eventName: string;
  subscriptionId: number;
  canceledMember: string;
  canceledBy: string;
  canceledAt: Date;
}
