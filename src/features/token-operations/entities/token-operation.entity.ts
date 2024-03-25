import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TokenOperationStatus, TokenOperationType } from "../enums";

@Entity()
export class TokenOperation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'bigint' })
  amount: string;

  @Column({ type: 'int' })
  tokenNonce: number;

  @Column({ type: 'varchar' })
  tokenIdentifier: string;
  
  @Column({ type: 'varchar' })
  txHash: string;

  @Column({ type: 'varchar' })
  sender: string;

  @Column({ type: 'varchar' })
  receiver: string;

  @Column({ type: 'enum', enum: TokenOperationType })
  type: string;

  @Column({ type: 'int', nullable: true })
  senderAccountsCount: number;

  @Column({ type: 'varchar', nullable: true })
  agreementTriggerId: string;
  
  @Column({ type: 'enum', nullable: true, enum: TokenOperationStatus })
  status?: string;

  @Column({ type: 'boolean', nullable: true })
  isInternal: boolean;

  @Column({ type: 'varchar', nullable: true })
  agreement?: string;

  @Column({ type: 'varchar', nullable: true })
  parentId?: string;

  @Column({ type: 'varchar', nullable: true })
  details?: string;
}
