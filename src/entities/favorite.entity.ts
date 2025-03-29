import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';
import { Product } from './product.entity';

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn()
  favorite_id: number;

  @Column()
  user_id: number;

  @Column()
  product_id: number;

  @CreateDateColumn()
  added_at: Date;

  @ManyToOne(() => User, (user) => user.favorites)
  user: User;

  @ManyToOne(() => Product)
  product: Product;
}
