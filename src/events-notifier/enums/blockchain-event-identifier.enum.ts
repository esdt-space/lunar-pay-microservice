export enum EventIdentifier {
  EGLD_DEPOSIT = 'depositEgld',
  ESDT_DEPOSIT = 'depositEsdt',
  EGLD_WITHDRAWAL = 'withdrawEgld',
  ESDT_WITHDRAWAL = 'withdrawEsdt',
  TOKEN_TRANSFER = 'transferTokens',
  CREATE_PAYMENT_AGREEMENT = 'createPaymentAgreement',
  SIGN_PAYMENT_AGREEMENT = 'signAgreement',
  CLAIM_TOTAL_AMOUNT_SUCCESS = 'claimTotalAmountSuccess',
  CLAIM_TOTAL_AMOUNT_FAILED = 'claimTotalAmountFailed',
}
