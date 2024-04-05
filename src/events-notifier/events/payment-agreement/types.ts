export type TriggerAgreementParsedEventResult = {
  agreementId: number;
  accounts: string[];
  cycles: number[];
  amounts: number[];
}

export type SignedAgreementParsedEventResult = {
  agreementId: number;
  eventName: string;
  address: string;
  metadata: string;
  signedAt: Date;
}
