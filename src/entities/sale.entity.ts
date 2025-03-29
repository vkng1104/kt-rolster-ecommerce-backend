import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductSale } from './product-sale.entity';

@Entity('sales')
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  sale_id: string;

  @Column({ length: 50 })
  code: string;

  @Column('decimal', { precision: 5, scale: 2 })
  discount_percentage: number;

  @CreateDateColumn()
  start_date: Date;

  @CreateDateColumn()
  end_date: Date;

  @OneToMany(() => ProductSale, (productSale) => productSale.sale)
  productSales: ProductSale[];
}
