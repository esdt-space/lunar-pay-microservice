import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { AgreementType, AgreementAmountType, AgreementUserFriendlyType } from '../enums';
import { RedirectAndWebhooksSettings } from '../models/redirect-and-webhooks-settings';

@Entity()
export class PaymentAgreement {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  owner: string;

  @Column({ type: 'int' })
  agreementIdentifier: number;

  @Column({type: 'enum', enum: AgreementType})
  agreementType: string;

  @Column({type: 'enum', enum: AgreementAmountType})
  amountType: string;

  @Column({ type: 'enum', enum: AgreementUserFriendlyType })
  userFriendlyType: string;

  @Column({ type: 'int' })
  frequency: number;

  @Column({ type: 'int', default: 0 })
  tokenNonce: number;

  @Column({ type: 'varchar' })
  tokenIdentifier: string;

  @Column({ type: 'int', default: 0 })
  accountsCount: number;

  @Column({ type: 'int', default: 0 })
  activeAccountsCount: number;

  @Column({ type: 'varchar' })
  ownerName?: string;

  @Column({ type: 'varchar' })
  itemName?: string;

  @Column({ type: 'varchar' })
  description?: string;

  @Column({ type: 'varchar' })
  content: string;

  @Column({ type: 'varchar' })
  fixedAmount?: string;

  @Column({ type: 'date' })
  createdAt?: string;

  @Column({ type: 'varchar' })
  signAgreementHttpCallbackUrl?: string;

  @Column({ type: 'varchar' })
  cancelAgreementHttpCallbackUrl?: string;

  @Column({ type: 'varchar' })
  signAgreementRedirectUrl?: string;

  // @Column({})
  // redirectAndWebhookSettings: RedirectAndWebhooksSettings;
}
