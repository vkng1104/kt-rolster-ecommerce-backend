import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Order } from './order.entity';
import { Cart } from './cart.entity';
import { UserProvider } from './user-provider.entity';
import { OAuthLogin } from './oauth-login.entity';
import { Favorite } from './favorite.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  user_id: string;

  @Column({ length: 100 })
  role: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255 })
  password: string;

  @Column({ length: 20 })
  phone_number: string;

  @Column('text')
  address: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Order, (order) => order.user)
  @JoinColumn({ name: 'user_id' })
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  @JoinColumn({ name: 'user_id' })
  carts: Cart[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  @JoinColumn({ name: 'user_id' })
  favorites: Favorite[];

  @OneToMany(() => UserProvider, (userProvider) => userProvider.user)
  @JoinColumn({ name: 'user_id' })
  userProviders: UserProvider[];

  @OneToMany(() => OAuthLogin, (oauthLogin) => oauthLogin.user)
  @JoinColumn({ name: 'user_id' })
  oauthLogins: OAuthLogin[];
}
