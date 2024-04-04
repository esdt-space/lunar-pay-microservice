export enum SubscriptionAmountType {
  AnyAmount = 'any-amount',
  FixedAmount = 'fixed-amount',
  BoundedAmount = 'bounded-amount',
  SenderDefinedFixedAmount = 'sender-defined-fixed-amount',
  SenderDefinedBoundedAmount = 'sender-defined-bounded-amount',
  CreatorDefinedFixedAmountPerReceiver = 'creator-defined-fixed-amount-per-receiver',
  CreatorDefinedBoundedAmountPerReceiver = 'creator-defined-bounded-amount-per-receiver',
}