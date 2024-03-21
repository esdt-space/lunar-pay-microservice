import { PickType } from '@nestjs/swagger';
import { PaymentAgreementMember } from '../entities';

export class CreateAgreementMemberDto extends PickType(
  PaymentAgreementMember,
  ['member', 'internalAgreementId', 'blockchainAgreementId', 'agreementType', 'createdAt']
) {}
