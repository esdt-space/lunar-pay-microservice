import { Column, Entity } from 'typeorm';

@Entity()
export class Token {
  @Column()
  name: string;

  @Column({ unique: true, primary: true })
  identifier: string;

  @Column()
  ticker: string;

  @Column()
  decimals: number;

  @Column()
  owner: string;

  @Column({ default: false, type: 'boolean' })
  verified = false;

  @Column({ default: null, nullable: true })
  price: string | null;

  @Column({ type: 'jsonb' })
  rawData: object;
}