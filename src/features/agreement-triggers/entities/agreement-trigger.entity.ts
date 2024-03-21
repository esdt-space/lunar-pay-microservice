import { Column, Entity } from "typeorm";

@Entity()
export class AgreementTrigger {
  @Column({ primary: true })
  id: string;

  @Column()
  agreement: string;

  @Column({ type: String, default: '0'  })
  successfulChargeAmount: string;

  @Column({ type: String, default: 0 })
  successfulAccountsCount: number;

  @Column({ type: String, default: '0'   })
  failedChargeAmount: string;

  @Column({ type: String, default: 0 })
  failedAccountsCount: number;
  
  @Column({ type: String })
  txHash: string;

  @Column({ type: Date })
  createdAt: Date;
}
