import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { UpdateMurmurDto } from './dto/update-murmur.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Murmur } from './entities/murmur.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class MurmursService {
  constructor(
    @InjectRepository(Murmur) private murmurRepository: Repository<Murmur>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async createMurmur(createMurmurDto: CreateMurmurDto): Promise<Murmur> {
    const user = await this.userRepository.findOne({ where: { 
      id: createMurmurDto.userId
     } });
    if (!user){
      throw new NotFoundException('User not found')
    }

    const murmur = await this.murmurRepository.create({
      text: createMurmurDto.text,
      user,
    });
    return await this.murmurRepository.save(murmur);
  }

  async findAll(page: number = 1): Promise<Murmur[]> {
    return this.murmurRepository.find({
      order: { createdAt: 'DESC' },
      relations: ['user'],
      take: 10,
      skip: (page - 1) * 10,
    });
  }

  async findOne(id: number): Promise<Murmur> {
    return this.murmurRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async delete(id: number, userId: number) {
    const murmur = await this.murmurRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!murmur) throw new NotFoundException('Murmur not found');
    if (murmur.user.id != userId) throw new NotFoundException('Forbidden');

    return await this.murmurRepository.remove(murmur);
  }
}
