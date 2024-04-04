import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AgreementType, AgreementAmountType, AgreementUserFriendlyType } from '../enums';

@Entity()
export class PaymentAgreement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  owner: string;

  @Column({ type: 'int' })
  agreementIdentifier: number;

  @Column({ type: 'int', default: 0 })
  tokenNonce: number;

  @Column({ type: 'varchar' })
  tokenIdentifier: string;

  @Column({type: 'enum', enum: AgreementType, nullable: true})
  agreementType: string;

  @Column({type: 'enum', enum: AgreementAmountType})
  amountType: string;

  @Column({ type: 'int' })
  frequency: number;

  @Column({ type: 'varchar', nullable: true })
  fixedAmount?: string;

  @Column({ type: 'varchar', nullable: true })
  minimumAmount?: string;

  @Column({ type: 'varchar', nullable: true })
  maximumAmount?: string;

  @Column({ type: 'date' })
  createdAt?: Date;

  @Column({ type: 'enum', enum: AgreementUserFriendlyType, nullable: true })
  userFriendlyType: string;

  @Column({ type: 'int', default: 0, nullable: true })
  accountsCount: number;

  @Column({ type: 'int', default: 0, nullable: true })
  activeAccountsCount: number;

  @Column({ type: 'varchar', nullable: true })
  ownerName?: string;

  @Column({ type: 'varchar', nullable: true })
  itemName?: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'varchar', nullable: true })
  content: string;

  @Column({ type: 'varchar', nullable: true })
  signAgreementHttpCallbackUrl?: string;

  @Column({ type: 'varchar', nullable: true })
  cancelAgreementHttpCallbackUrl?: string;

  @Column({ type: 'varchar', nullable: true })
  signAgreementRedirectUrl?: string;

  @Column({ type: 'varchar', nullable: true })
  httpWebhookUrl?: string;

  @Column({ type: 'varchar', nullable: true })
  httpWebhookSecret?: string;
}
