export type TriggerAgreementResult = {
  agreementId: number;
  accounts: string[];
  cycles: number[];
  amounts: number[];
}

export type SignedAgreementResult = {
  agreementId: number;
  eventName: string;
  address: string;
  metadata: string;
  signedAt: Date;
}
