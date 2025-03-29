import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn()
  payment_id: number;

  @Column()
  order_id: number;

  @Column({ length: 50 })
  payment_type: string;

  @Column({ length: 20 })
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  transaction_date: Date;

  @OneToMany(() => Order, (order) => order.payment)
  orders: Order[];
}
