import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';

@Entity('murmur')
export class Murmur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  text: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.murmurs, { onDelete: 'CASCADE' })
  user: User;
}