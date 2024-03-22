import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AgreementMemberStatus, AgreementType } from '@/features/payment-agreements/enums';

@Entity()
export class PaymentAgreementMember {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  member: string;

  @Column({ type: 'varchar' })
  internalAgreementId: string;

  @Column({ type: 'int' })
  blockchainAgreementId: number;

  @Column({ type: 'enum', enum: AgreementType })
  agreementType: string;

  @Column({ type: 'enum', enum: AgreementMemberStatus, default: AgreementMemberStatus.Active })
  status: string;

  @Column({ type: 'date' })
  lastChargedAt: string;
  
  @Column({ type: 'date' })
  lastSuccessfulCharge: string;

  @Column({ type: 'date' })
  canceledAt: string;

  @Column({ type: 'date' })
  createdAt?: string;
}
