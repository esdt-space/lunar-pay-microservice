import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

import { SubscriptionMemberStatus, SubscriptionType } from "../enums";

@Entity()
export class SubscriptionMember {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  member: string;
  
  @Column({ type: 'varchar', nullable: true  })
  metadata: string;

  @Column({ type: 'varchar' })
  internalSubscriptionId: string;

  @Column({ type: 'int', nullable: true })
  blockchainSubscriptionId: number;

  @Column({ type: 'enum', enum: SubscriptionType })
  subscriptionType: string;

  @Column({ type: 'enum', enum: SubscriptionMemberStatus, default: SubscriptionMemberStatus.Active })
  status: string;

  @Column({ type: 'date', nullable: true })
  lastChargedAt: string;
  
  @Column({ type: 'date', nullable: true })
  lastSuccessfulCharge: string;

  @Column({ type: 'date', nullable: true })
  canceledAt: string;

  @Column({ type: 'timestamp with time zone' })
  createdAt: Date;
}
