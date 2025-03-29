import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { OrderItem } from './order-item.entity';
import { Payment } from './payment.entity';
import { Shipping } from './shipping.entity';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn('uuid')
  order_id: string;

  @Column()
  user_id: string;

  @Column()
  shipping_id: string;

  @Column()
  payment_id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  total_price: number;

  @Column({ length: 20 })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.orders)
  user: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order)
  orderItems: OrderItem[];

  @ManyToOne(() => Payment, (payment) => payment.orders)
  payment: Payment;

  @ManyToOne(() => Shipping, (shipping) => shipping.orders)
  shipping: Shipping;
}
