import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn('uuid')
  category_id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  slug: string;

  @Column('text', { nullable: true })
  description: string;

  @OneToMany(() => Product, (product) => product.category)
  @JoinColumn({ name: 'category_id' })
  products: Product[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
