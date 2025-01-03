import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { CartItem } from './cart-item.entity';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    eager: true,
    cascade: true,
  })
  items: CartItem[];

  @OneToOne(() => User, (user) => user.cart, {
    eager: true,
  })
  @JoinColumn()
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
