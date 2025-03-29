import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Product } from './product.entity';

@Entity('product_images')
export class ProductImage {
  @PrimaryGeneratedColumn('uuid')
  image_id: string;

  @Column()
  product_id: string;

  @Column({ length: 255 })
  image_url: string;

  @ManyToOne(() => Product, (product) => product.images)
  product: Product;
}
