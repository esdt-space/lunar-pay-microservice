import BigNumber from "bignumber.js";

export type TriggerSubscriptionParseEvent = {
  id: BigNumber,
  timestamp: BigNumber,
  data: any[],
}

export type TriggerSubscriptionParsedEventResult = {
  subscriptionId: number;
  createdAt: number;
  data: any[];
}

export type SignSubscriptionParsedEventResult = {
  eventName: string;
  subscriptionId: number;
  address: string;
  signedAt: Date;
}
