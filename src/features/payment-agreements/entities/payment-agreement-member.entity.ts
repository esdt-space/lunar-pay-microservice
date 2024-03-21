import { Column, Entity } from 'typeorm';

import { AgreementMemberStatus, AgreementType } from '@/features/payment-agreements/enums';

@Entity()
export class PaymentAgreementMember {
  @Column({ primary: true })
  member: string;

  @Column()
  internalAgreementId: string;

  @Column()
  blockchainAgreementId: number;

  @Column()
  agreementType: AgreementType;

  @Column({ type: String, enum: AgreementMemberStatus, default: AgreementMemberStatus.Active })
  status: AgreementMemberStatus;

  @Column({ type: Date })
  lastChargedAt: Date;
  
  @Column({ type: Date })
  lastSuccessfulCharge: Date;

  @Column({ type: Date })
  canceledAt: Date;

  @Column({ type: Date })
  createdAt?: Date;
}
