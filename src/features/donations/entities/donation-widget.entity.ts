import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class DonationWidget {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  owner: string;

  @Column({ type: 'varchar' })
  receiver: string;

  @Column({ type: 'varchar' })
  donationId: string;

  @Column({ type: 'varchar', nullable: true })
  metadata: string;

  @Column({ type: 'varchar' })
  codeString: string;

  @Column({ type: 'date' })
  createdAt?: Date;
}
