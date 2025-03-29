import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';

@Entity('payments')
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  payment_id: string;

  @Column()
  order_id: string;

  @Column({ length: 50 })
  payment_type: string;

  @Column({ length: 20 })
  status: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @CreateDateColumn()
  transaction_date: Date;

  @OneToMany(() => Order, (order) => order.payment)
  @JoinColumn({ name: 'payment_id' })
  orders: Order[];
}
