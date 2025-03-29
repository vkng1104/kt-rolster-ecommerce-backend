import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';
import { Sale } from './sale.entity';

@Entity('product_sales')
export class ProductSale {
  @PrimaryGeneratedColumn()
  product_sale_id: number;

  @Column()
  product_id: number;

  @Column()
  sale_id: number;

  @ManyToOne(() => Product, (product) => product.productSales)
  product: Product;

  @ManyToOne(() => Sale, (sale) => sale.productSales)
  sale: Sale;
}
