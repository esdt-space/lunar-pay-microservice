export enum EventType {
  /** Subscription Events */
  AllSubscriptionsEvents = 'subscription.*',
  SubscriptionCreated = 'subscription.created',
  SubscriptionCanceled = 'subscription.canceled',
  AllSubscriptionChargeEvents = 'subscription.charge.*',
  SubscriptionChargeFailed = 'subscription.charge.failed',
  SubscriptionChargeCreated = 'subscription.charge.created',
  SubscriptionMembershipCreated = 'subscription.membership.created',
  SubscriptionMembershipCanceled = 'subscription.membership.canceled',

  /** Payment Events */
  AllPaymentsEvents = 'payment.*',
  PaymentCreated = 'payment.created',
  PaymentFailedEvent = 'payment.created',

  /** Deposit, Withdraw and Transfer Events */
  AllTokensEvents = 'tokens.*',
  DepositCreated = 'tokens.deposit.created',
  WithdrawCreated = 'tokens.withdraw.created',
  TransferCreated = 'tokens.transfer.created',
}
