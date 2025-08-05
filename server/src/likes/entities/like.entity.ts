import { Murmur } from 'src/murmurs/entities/murmur.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';

@Entity('like')
@Unique(['user', 'murmur'])
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Murmur, { onDelete: 'CASCADE' })
  murmur: Murmur;

  @CreateDateColumn()
  createdAt: Date;
}