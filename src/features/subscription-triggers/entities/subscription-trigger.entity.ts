import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SubscriptionTrigger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true  })
  subscription: string;

  @Column({ type: 'varchar', nullable: true })
  successfulChargeAmount: string;

  @Column({ type: 'int', nullable: true })
  successfulCycles: number;

  @Column({ type: 'varchar', nullable: true })
  failedChargeAmount: string;

  @Column({ type: 'int', nullable: true })
  failedCycles: number;
  
  @Column({ type: 'varchar' })
  txHash: string;

  @Column({ type: 'timestamp with time zone' })
  createdAt: Date;
}
