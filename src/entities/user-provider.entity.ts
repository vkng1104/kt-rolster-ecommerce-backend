import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import { User } from './user.entity';

@Entity('user_providers')
export class UserProvider {
  @PrimaryGeneratedColumn('uuid')
  user_provider_id: string;

  @Column()
  user_id: string;

  @Column()
  provider_id: string;

  @Column({ length: 255 })
  provider_user_id: string;

  @Column('text')
  access_token: string;

  @Column('text', { nullable: true })
  refresh_token: string;

  @Column()
  expires_in: number;

  @Column({ length: 255 })
  email: string;

  @Column({ length: 255, nullable: true })
  profile_picture: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => User, (user) => user.userProviders)
  user: User;
}
