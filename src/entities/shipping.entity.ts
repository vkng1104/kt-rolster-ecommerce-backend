import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './order.entity';

@Entity('shipping')
export class Shipping {
  @PrimaryGeneratedColumn()
  shipping_id: number;

  @Column({ length: 50 })
  method: string;

  @Column('decimal', { precision: 10, scale: 2 })
  cost: number;

  @Column({ length: 50 })
  estimated_delivery_time: string;

  @OneToMany(() => Order, (order) => order.shipping)
  orders: Order[];
}
