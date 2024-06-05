import BigNumber from "bignumber.js";
import { Address } from '@multiversx/sdk-core/out';

// Create Subscription
export type CreateSubscriptionParsedEvent = {
  id: BigNumber,
  owner: Address,
  token_nonce: BigNumber,
  token_identifier: string,
  frequency: BigNumber,
  time_created: BigNumber,
  subscription_type: number,
  amount_type: number,
  amount: string,
}

// Sign Subscription
export type SignSubscriptionParsedEvent = {
  id: BigNumber,
  member: Address,
  created_at: BigNumber,
}

export type SignSubscriptionResult = {
  eventName: string;
  subscriptionId: number;
  address: string;
  signedAt: Date;
}

// Trigger Subscription
type ChargeOperationValue = [string, number] | null;

export type SubscriptionMultiChargeResult = {
  account: string;
  data: [ChargeOperationValue, ChargeOperationValue];
}

export type TriggerSubscriptionParsedEvent = {
  id: BigNumber,
  timestamp: BigNumber,
  data: SubscriptionMultiChargeResult[],
}

export type TriggerSubscriptionResult = {
  subscriptionId: number;
  createdAt: number;
  data: SubscriptionMultiChargeResult[];
}

// Cancel Subscription
export type CancelSubscriptionResult = {
  eventName: string;
  subscriptionId: number;
  canceledMember: string;
  canceledBy: string;
  canceledAt: Date;
}
