type AmountValuePerSubscriber = {
  address: string;
  amount: number;
};

type BoundedAmountValuePerSubscriber = {
  address: string;
  amount: BoundedAmount;
};

type AnyAmount = undefined;
type FixedAmount = { amount: number };
type BoundedAmount = { minimum_amount?: number; maximum_amount: number };
type SubscriberDefinedAmount = AmountValuePerSubscriber[];
type FixedAmountPerSubscriber = AmountValuePerSubscriber[];
type BoundedAmountPerSubscriber = BoundedAmountValuePerSubscriber[];

type AmountType =
  | AnyAmount
  | FixedAmount
  | BoundedAmount
  | SubscriberDefinedAmount
  | FixedAmountPerSubscriber;
type FrequencyType = 'SS' | 'MM' | 'HH' | 'D' | 'W' | 'M' | 'Y';

type RecurringPayoutToSend = {
  sender: string;
  receivers: string[];
  amountType: AmountType;

  frequency: FrequencyType;
};

type RecurringPayoutToReceive = {
  receiver: string;
  senders: string[];
  amountType: AmountType;

  frequency: FrequencyType;

  can_subscribe?: boolean;
  whitelistEnabled?: boolean;
  whitelistedAddresses?: [];
};

type TimeBoundPayoutToSend = {
  sender: string;
  receivers: string[];
  amountType: AmountType;

  frequency: FrequencyType;
};

type TimeBoundPayoutToReceive = {
  receiver: string;
  senders: string[];

  frequency: FrequencyType;
  amountType: AnyAmount | BoundedAmount | BoundedAmountPerSubscriber;
};

export type AgreementType =
  | RecurringPayoutToSend
  | RecurringPayoutToReceive
  | TimeBoundPayoutToSend
  | TimeBoundPayoutToReceive;

type Agreement<T extends AgreementType> = {
  owner: string;
  agreementType: T;

  token_nonce?: string;
  token_identifier?: string;

  whitelist_enabled?: boolean;
  whitelist?: string[];
};

const subscriptionAgreement: Agreement<RecurringPayoutToReceive> = {
  owner: 'owner-address',
  agreementType: {
    receiver: 'owner-address',
    senders: ['sender-one', 'sender-two'],
    frequency: 'M',
    amountType: { amount: 200 } as FixedAmount,
  },
};

const donationAgreement: Agreement<RecurringPayoutToReceive> = {
  owner: 'owner-address',
  agreementType: {
    receiver: 'receiver-address',
    senders: ['sender-one', 'sender-two'],
    frequency: 'W',
    amountType: [
      { address: 'sender-one', amount: 500 },
      { address: 'sender-two', amount: 200 },
    ] as SubscriberDefinedAmount,
  },
};

const payrollAgreement: Agreement<RecurringPayoutToSend> = {
  owner: 'owner-address',
  agreementType: {
    sender: 'owner-address',
    receivers: ['receiver-one', 'receiver-two'],
    frequency: 'M',
    amountType: [
      { address: 'receiver-one', amount: 500 },
      { address: 'receiver-two', amount: 200 },
    ] as FixedAmountPerSubscriber,
  },
};

const teamBudgetAgreement: Agreement<TimeBoundPayoutToSend> = {
  owner: 'owner-address',
  agreementType: {
    sender: 'owner-address',
    receivers: ['receiver-one', 'receiver-two'],
    frequency: 'Y',
    amountType: [
      { address: 'receiver-one', amount: 150000 },
      { address: 'receiver-two', amount: 200000 },
    ] as FixedAmountPerSubscriber,
  },
};

const dcaAgreement: Agreement<TimeBoundPayoutToReceive> = {
  owner: 'owner-address',
  agreementType: {
    receiver: 'receiver-address',
    senders: ['sender-one', 'sender-two'],
    amountType: undefined as AnyAmount,
    frequency: 'M',
  },
};
