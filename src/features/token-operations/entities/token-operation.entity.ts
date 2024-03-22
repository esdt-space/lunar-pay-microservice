import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TokenOperationStatus, TokenOperationType } from "../enums";

@Entity()
export class TokenOperation {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ type: 'enum', enum: TokenOperationType })
  type: string;

  @Column({ type: 'varchar' })
  sender: string;

  @Column({ type: 'int' })
  senderAccountsCount: number;

  @Column({ type: 'varchar' })
  receiver: string;

  @Column({ type: 'varchar' })
  agreementTriggerId: string;

  @Column({ type: 'enum', enum: TokenOperationStatus })
  status?: string;

  @Column({ type: 'bigint' })
  amount: string;

  @Column({ type: 'int' })
  tokenNonce: number;

  @Column({ type: 'varchar' })
  tokenIdentifier: string;

  @Column({ type: 'varchar' })
  txHash: string;

  @Column({ type: 'boolean' })
  isInternal: boolean;

  @Column({ type: 'varchar' })
  agreement?: string;

  @Column({ type: 'varchar' })
  parentId?: string;

  @Column({ type: 'varchar' })
  details?: string;
}
