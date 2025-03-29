import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn('uuid')
  favorite_id: string;

  @Column()
  user_id: string;

  @Column()
  product_id: string;

  @CreateDateColumn()
  added_at: Date;

  @ManyToOne(() => User, (user) => user.favorites)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;
}
