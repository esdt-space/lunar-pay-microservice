import { Column, Entity } from 'typeorm';

@Entity()
export class TokenPrice {
  @Column({ unique: true, primary: true })
  identifier: string;
  
  @Column({ default: null, nullable: true })
  price: string | null;

  @Column()
  source: string;
}