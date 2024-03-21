import { Column, Entity } from 'typeorm';

import { AgreementType, AgreementAmountType, AgreementUserFriendlyType } from '../enums';
import { RedirectAndWebhooksSettings } from '../models/redirect-and-webhooks-settings';

@Entity()
export class PaymentAgreement {
  @Column({primary: true})
  id: string;

  @Column()
  owner: string;

  @Column({ unique: true })
  agreementIdentifier: number;

  @Column()
  agreementType: AgreementType;

  @Column()
  amountType: AgreementAmountType;

  @Column({ type: String, enum: AgreementUserFriendlyType })
  userFriendlyType: AgreementUserFriendlyType;

  @Column()
  frequency: number;

  @Column({ type: Number, default: 0 })
  tokenNonce: number;

  @Column()
  tokenIdentifier: string;

  @Column({ type: Number, default: 0 })
  accountsCount: number;

  @Column({ type: Number, default: 0 })
  activeAccountsCount: number;

  @Column()
  ownerName?: string;

  @Column()
  itemName?: string;

  @Column()
  description?: string;

  @Column()
  content: string;

  @Column()
  fixedAmount?: string;

  @Column({ type: Date })
  createdAt?: Date;

  @Column()
  signAgreementHttpCallbackUrl?: string;

  @Column()
  cancelAgreementHttpCallbackUrl?: string;

  @Column()
  signAgreementRedirectUrl?: string;

  // @Column({})
  // redirectAndWebhookSettings: RedirectAndWebhooksSettings;
}
