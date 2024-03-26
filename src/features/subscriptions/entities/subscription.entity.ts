import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { SubscriptionAmountType, SubscriptionType } from "../enums";

@Entity()
export class Subscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  
  @Column({ type: 'varchar' })
  owner: string;

  @Column({ type: 'int' })
  subscriptionIdentifier: number;

  @Column({ type: 'int', default: 0 })
  tokenNonce: number;

  @Column({ type: 'varchar' })
  tokenIdentifier: string;

  @Column({ type: 'enum', enum: SubscriptionType })
  subscriptionType: string;

  @Column({ type: 'enum', enum: SubscriptionAmountType })
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
  signSubscriptionHttpCallbackUrl?: string;

  @Column({ type: 'varchar', nullable: true })
  cancelSubscriptionHttpCallbackUrl?: string;

  @Column({ type: 'varchar', nullable: true })
  signSubscriptionRedirectUrl?: string;

  @Column({ type: 'varchar', nullable: true })
  httpWebhookUrl?: string;

  @Column({ type: 'varchar', nullable: true })
  httpWebhookSecret?: string;
}
