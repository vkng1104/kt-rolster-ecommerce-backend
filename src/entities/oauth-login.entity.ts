import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('oauth_logins')
export class OAuthLogin {
  @PrimaryGeneratedColumn()
  login_id: number;

  @Column()
  user_id: number;

  @Column()
  provider_id: number;

  @CreateDateColumn()
  login_time: Date;

  @Column({ length: 20 })
  status: string;

  @Column('text', { nullable: true })
  error_message: string;

  @Column({ length: 45 })
  ip_address: string;

  @ManyToOne(() => User, (user) => user.oauthLogins)
  user: User;
}
