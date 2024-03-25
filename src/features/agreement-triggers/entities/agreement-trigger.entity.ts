import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AgreementTrigger {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'varchar' })
  agreement: string;

  @Column({ type: 'bigint', default: 0 })
  successfulChargeAmount: string;

  @Column({ type: 'int', default: 0 })
  successfulAccountsCount: number;

  @Column({ type: 'bigint', default: 0 })
  failedChargeAmount: string;

  @Column({ type: 'int', nullable: true })
  failedAccountsCount: number;
  
  @Column({ type: 'varchar' })
  txHash: string;

  @Column({ type: 'date', nullable: true })
  createdAt: string;
}
