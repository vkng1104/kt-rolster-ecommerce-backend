import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { Sale } from './sale.entity';

@Entity('product_sales')
export class ProductSale {
  @PrimaryGeneratedColumn('uuid')
  product_sale_id: string;

  @Column()
  product_id: string;

  @Column()
  sale_id: string;

  @ManyToOne(() => Product, (product) => product.productSales)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Sale, (sale) => sale.productSales)
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;
}
