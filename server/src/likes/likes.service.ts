import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import { Murmur } from 'src/murmurs/entities/murmur.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Like) private likeRepository: Repository<Like>,
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Murmur) private murmurRepository: Repository<Murmur>,
  ) {}

  async doLike(murmurId: number,userId: number){
    const user = await this.userRepository.findOneBy({ id: userId });
    const murmur = await this.murmurRepository.findOneBy({ id: murmurId });

    if (!user || !murmur) throw new NotFoundException('User or Murmur not found');

    const like = this.likeRepository.create({ user, murmur });
    return await this.likeRepository.save(like);
  }

  async doUnlike(murmurId: number,userId: number) {
    const like = await this.likeRepository.findOne({
      where: {
        user: { id: userId },
        murmur: { id: murmurId },
      },
      relations: ['user', 'murmur'],
    });

    if (!like) throw new NotFoundException('User did not like this murmur');
    await await this.likeRepository.remove(like);
  }

  async countLikes(murmurId: number): Promise<number> {
    return await this.likeRepository.count({ where: { murmur: { id: murmurId } } });
  }
}
