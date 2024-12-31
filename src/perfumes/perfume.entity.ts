import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Perfume {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column()
  brand: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column({ default: 0 })
  stock: number;

  @Column({ nullable: true })
  imageUrl: string;
}
