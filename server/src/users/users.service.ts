import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>) {}

  async create(data: CreateUserDto){
    const hashed = await bcrypt.hash(data.password, 10);

    const user: User = new User();
    user.username = data.username;
    user.name = data.name;
    user.email = data.email;
    user.password = hashed;
    user.isActive = true;

    return await this.userRepository.save(user);
  }

  findAll(){
    return this.userRepository.find();
  }

  findOne(id: number){
    return this.userRepository.findOne({ where: { id } });
  }

  async findByUsername(userName: string, password: string): Promise<User | null> {
    const hashed = await bcrypt.hash(password, 10);
    const user = await this.userRepository.findOne({ where: { 
      username: userName,
      password: hashed
     } });

    if (!user) return null;

    return user;
  }
}
