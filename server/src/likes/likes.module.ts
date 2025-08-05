import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import { Murmur } from 'src/murmurs/entities/murmur.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Like, User, Murmur])
  ],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
