import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SubscriptionTrigger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true  })
  subscription: string;

  @Column({ type: 'varchar', default: '0'  })
  successfulChargeAmount: string;

  @Column({ type: 'int', default: 0 })
  successfulAccountsCount: number;

  @Column({ type: 'varchar', default: '0'   })
  failedChargeAmount: string;

  @Column({ type: 'int', default: 0 })
  failedAccountsCount: number;
  
  @Column({ type: 'varchar' })
  txHash: string;

  @Column({ type: 'timestamp with time zone' })
  createdAt: Date;
}
