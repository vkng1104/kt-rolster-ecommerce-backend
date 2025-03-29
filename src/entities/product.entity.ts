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
import { Category } from './category.entity';
import { CartItem } from './cart-item.entity';
import { Favorite } from './favorite.entity';
import { OrderItem } from './order-item.entity';
import { ProductImage } from './product-image.entity';
import { ProductSale } from './product-sale.entity';
import { ProductCollection } from './product-collection.entity';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  product_id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  slug: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;

  @Column()
  stock_quantity: number;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => ProductImage, (productImage) => productImage.product)
  @JoinColumn({ name: 'product_id' })
  images: ProductImage[];

  @OneToMany(() => CartItem, (cartItem) => cartItem.product)
  @JoinColumn({ name: 'product_id' })
  cartItems: CartItem[];

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product)
  @JoinColumn({ name: 'product_id' })
  orderItems: OrderItem[];

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  @JoinColumn({ name: 'product_id' })
  favorites: Favorite[];

  @OneToMany(() => ProductSale, (productSale) => productSale.product)
  @JoinColumn({ name: 'product_id' })
  productSales: ProductSale[];

  @OneToMany(
    () => ProductCollection,
    (productCollection) => productCollection.product,
  )
  @JoinColumn({ name: 'product_id' })
  productCollections: ProductCollection[];
}
