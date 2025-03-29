import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';
import { Product } from './product.entity';
import { Collection } from './collection.entity';

@Entity('product_collections')
export class ProductCollection {
  @PrimaryGeneratedColumn('uuid')
  product_collection_id: string;

  @Column()
  product_id: string;

  @Column()
  collection_id: string;

  @ManyToOne(() => Product, (product) => product.productCollections)
  product: Product;

  @ManyToOne(() => Collection, (collection) => collection.productCollections)
  collection: Collection;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
