import { AgreementType } from '@/features/payment-agreements/enums';

const map = {
  0: AgreementType.RecurringPayoutToSend,
  1: AgreementType.RecurringPayoutToReceive,
  2: AgreementType.TermRestrictedPayoutToSend,
  3: AgreementType.TermRestrictedPayoutToReceive,
};

export function blockchainAgreementTypeToApiType(type: number){
  return map[type];
}