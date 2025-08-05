import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import { Murmur } from 'src/murmurs/entities/murmur.entity';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  name: string;

  @Column()
  @IsEmail()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ default: true })
  isActive!: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Murmur, murmur => murmur.user)
  murmurs: Murmur[];
}
