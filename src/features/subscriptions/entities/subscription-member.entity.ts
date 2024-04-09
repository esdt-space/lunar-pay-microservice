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

  @Column({ type: 'timestamp with time zone', nullable: true })
  lastChargedAt: Date;
  
  @Column({ type: 'timestamp with time zone', nullable: true })
  lastSuccessfulCharge: Date;

  @Column({ type: 'timestamp with time zone', nullable: true })
  canceledAt: Date;

  @Column({ type: 'timestamp with time zone' })
  createdAt: Date;
}
