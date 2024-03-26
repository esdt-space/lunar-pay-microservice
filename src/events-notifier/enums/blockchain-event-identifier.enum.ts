export enum EventIdentifier {
  EGLD_DEPOSIT = 'depositEgld',
  ESDT_DEPOSIT = 'depositEsdt',
  EGLD_WITHDRAWAL = 'withdrawEgld',
  ESDT_WITHDRAWAL = 'withdrawEsdt',
  TOKEN_TRANSFER = 'transferTokens',
  CREATE_PAYMENT_AGREEMENT = 'createPaymentAgreement',
  SIGN_PAYMENT_AGREEMENT = 'signAgreement',
  TRIGGER_AGREEMENT = 'triggerAgreement',
  SUCCESSFUL_AGREEMENT_CHARGES = 'successfulAgreementCharges',
  FAILED_AGREEMENT_CHARGES = 'failedAgreementCharges',
  PAYMENT = 'pay',
  CREATE_SUBSCRIPTION = 'createSubscription',
  CREATE_SUBSCRIPTION_MEMBERSHIP = 'createSubscriptionMembership',
  TRIGGER_SUBSCRIPTION = 'chargeSubscription',
}
