import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { DonationTarget, DonationType } from "../enums";

@Entity()
export class Donation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  owner: string;

  @Column({ type: 'enum', enum: DonationType, default: DonationType.OneTimeDonation })
  donationType: string;

  @Column({ type: 'enum', enum: DonationTarget, default: DonationTarget.ContentCreator })
  donationTarget: string;

  @Column({ type: 'varchar' })
  tokenIdentifier?: string;

  @Column({ type: 'int', default: 0 })
  tokenNonce?: number;

  @Column({ type: 'date' })
  createdAt?: Date;

  @Column({ type: 'varchar', nullable: true })
  totalAmount: string;

  @Column({ type: 'varchar', nullable: true })
  beneficiaryName?: string;

  @Column({ type: 'varchar', nullable: true })
  description?: string;

  @Column({ type: 'varchar', nullable: true })
  fixedAmount?: string;

  @Column({ type: 'varchar', nullable: true })
  backgroundImageUrl?: string;

  @Column({ type: 'varchar', nullable: true })
  payDonationHttpCallbackUrl?: string;

  @Column({ type: 'varchar', nullable: true  })
  payDonationRedirectUrl?: string;

  @Column({ type: 'varchar', nullable: true })
  httpWebhookUrl?: string;

  @Column({ type: 'varchar', nullable: true })
  httpWebhookSecret?: string;
}
