export enum BlockchainEventDecoded {
  BlockchainDepositEventDecoded = 'blockchain.deposit.decoded',
  BlockchainWithdrawEventDecoded = 'blockchain.withdraw.decoded',
  BlockchainTokenTransferEventDecoded = 'blockchain.token-transfer.decoded',
  BlockchainCreatePaymentAgreementEventDecoded = 'blockchain.create-payment-agreement.decoded',
  SignPaymentAgreement = 'blockchain.sign-payment-agreement.decoded',
  CancelPaymentAgreement = 'blockchain.cancel-payment-agreement.decoded',
  TriggerPaymentAgreement = 'blockchain.trigger-payment-agreement.decoded',
  Payment = 'blockchain.payment.decoded',
}