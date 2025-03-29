import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { ProductCollection } from './product-collection.entity';

@Entity('collections')
export class Collection {
  @PrimaryGeneratedColumn('uuid')
  collection_id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  slug: string;

  @Column('text')
  description: string;

  @Column({ default: true })
  is_active: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => ProductCollection,
    (productCollection) => productCollection.collection,
  )
  productCollections: ProductCollection[];
}
