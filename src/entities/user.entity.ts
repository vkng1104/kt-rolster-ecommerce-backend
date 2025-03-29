import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { Order } from './order.entity';
import { Cart } from './cart.entity';
import { UserProvider } from './user-provider.entity';
import { OAuthLogin } from './oauth-login.entity';
import { Favorite } from './favorite.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

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
  orders: Order[];

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Favorite, (favorite) => favorite.user)
  favorites: Favorite[];

  @OneToMany(() => UserProvider, (userProvider) => userProvider.user)
  userProviders: UserProvider[];

  @OneToMany(() => OAuthLogin, (oauthLogin) => oauthLogin.user)
  oauthLogins: OAuthLogin[];
}
