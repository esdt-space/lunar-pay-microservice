export enum EventType {
  /** Subscription Events */
  AllSubscriptionsEvents = 'subscription.*',
  SubscriptionCreated = 'subscription.created',
  SubscriptionCanceled = 'subscription.canceled',
  AllSubscriptionChargeEvents = 'subscription.charge.*',
  SubscriptionChargeFailed = 'subscription.charge.failed',
  SubscriptionChargeSuccessful = 'subscription.charge.successful',

  /** Payment Events */
  AllPaymentsEvents = 'payment.*',
  PaymentSuccessful = 'payment.successful',
  PaymentFailedEvent = 'payment.failed',

  /** Deposit, Withdraw and Transfer Events */
  AllTokensEvents = 'tokens.*',
  DepositSuccessful = 'tokens.deposit.successful',
  WithdrawSuccessful = 'tokens.withdraw.successful',
  TransferSuccessful = 'tokens.transfer.successful',
}
