import { Module } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { MurmursController } from './murmurs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Murmur } from './entities/murmur.entity';
import { FollowsService } from 'src/follows/follows.service';
import { Follow } from 'src/follows/entities/follow.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Murmur, User, Follow])],
  controllers: [MurmursController],
  providers: [MurmursService, FollowsService],
})
export class MurmursModule {}
