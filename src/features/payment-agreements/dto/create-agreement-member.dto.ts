import { PickType } from '@nestjs/swagger';
import { PaymentAgreementMember } from '@/features/payment-agreements/payment-agreement-member.schema';

export class CreateAgreementMemberDto extends PickType(
  PaymentAgreementMember,
  ['member', 'internalAgreementId', 'blockchainAgreementId', 'agreementType', 'createdAt']
) {}
