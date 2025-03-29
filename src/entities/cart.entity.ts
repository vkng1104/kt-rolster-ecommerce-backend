import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { CartItem } from './cart-item.entity';

@Entity('carts')
export class Cart {
  @PrimaryGeneratedColumn('uuid')
  cart_id: string;

  @Column()
  user_id: string;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, (user) => user.carts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  @JoinColumn({ name: 'cart_id' })
  cartItems: CartItem[];

  @Column({ default: true })
  isActive: boolean;

  @UpdateDateColumn()
  updatedAt: Date;
}
