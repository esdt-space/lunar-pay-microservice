import { AgreementAmountType } from '@/features/payment-agreements/enums';

const map = {
  0: AgreementAmountType.AnyAmount,
  1: AgreementAmountType.FixedAmount,
  2: AgreementAmountType.BoundedAmount,
  3: AgreementAmountType.SenderDefinedFixedAmount,
  4: AgreementAmountType.SenderDefinedBoundedAmount,
  5: AgreementAmountType.CreatorDefinedFixedAmountPerReceiver,
  6: AgreementAmountType.CreatorDefinedBoundedAmountPerReceiver,
};

export function blockchainAgreementAmountTypeToApiType(type: number){
  return map[type];
}