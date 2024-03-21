import { Column, Entity } from "typeorm";
import { TokenOperationStatus, TokenOperationType } from "../enums";

@Entity()
export class TokenOperation {
  @Column({ primary: true})
  id: string;

  @Column({ type: String, enum: Object.values(TokenOperationType) })
  type: TokenOperationType;

  @Column({ nullable: true })
  sender: string;

  @Column({ type: Number, nullable: true })
  senderAccountsCount: number;

  @Column({ nullable: true  })
  receiver: string;

  @Column({ type: String, nullable: true })
  agreementTriggerId: string;

  @Column({ type: String })
  status?: TokenOperationStatus;

  @Column({ type: Number })
  amount: number;

  @Column({ type: Number })
  tokenNonce: number;

  @Column()
  tokenIdentifier: string;

  @Column({ type: String, nullable: true })
  txHash: string;

  @Column({ type: Boolean, nullable: true })
  isInternal: boolean;

  @Column()
  agreement?: string;

  @Column({ nullable: true })
  parentId?: string;

  @Column({ type: String })
  details?: string;
}
