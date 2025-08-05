import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FollowsService {
  constructor(
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) { }

  async followAUser(followingId: number, followerId: number){
    if (followerId === followingId) throw new BadRequestException('Cannot follow self');

    const follower = await this.userRepository.findOneBy({ id: followerId });
    const following = await this.userRepository.findOneBy({ id: followingId });

    if (!follower || !following) throw new NotFoundException('User not found');

    const follow = this.followRepository.create({ follower, following });
    return await this.followRepository.save(follow);
  }

  async unfollowAUser(followingId: number, followerId: number) {
    const follow = await this.followRepository.findOne({
      where: {
        follower: { id: followerId },
        following: { id: followingId },
      },
      relations: ['follower', 'following'],
    });

    if (!follow) throw new NotFoundException('Not following');

    await await this.followRepository.remove(follow);
  }

  async getFollowers(userId: number){
    const results = await this.followRepository.find({
      where: { following: { id: userId } },
      relations: ['follower'],
    });

    return await results.map(f => f.follower);
  }

  async getFollowing(userId: number) {
    const results = await this.followRepository.find({
      where: { follower: { id: userId } },
      relations: ['following'],
    });

    return await results.map(f => f.following);
  }

  async getFollowingIds(userId: number) {
    const results = await this.followRepository.find({
      where: { follower: { id: userId } },
      relations: ['following'],
    });

    return await results.map(f => f.following.id);
  }
}
