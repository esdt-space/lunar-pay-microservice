import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class AgreementTrigger {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  agreement: string;

  @Column({ type: 'bigint', default: 0 })
  successfulChargeAmount: string;

  @Column({ type: 'int', default: 0 })
  successfulCycles: number;

  @Column({ type: 'bigint', default: 0 })
  failedChargeAmount: string;

  @Column({ type: 'int', nullable: true })
  failedCycles: number;
  
  @Column({ type: 'varchar' })
  txHash: string;

  @Column({ type: 'timestamp with time zone' })
  createdAt: Date;
}
