import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['follower', 'following'])
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  follower: User;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  following: User;

  @CreateDateColumn()
  created_at: Date;
}