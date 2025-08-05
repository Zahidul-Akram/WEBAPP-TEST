import { Module } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { MurmursController } from './murmurs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Murmur } from './entities/murmur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Murmur, User])],
  controllers: [MurmursController],
  providers: [MurmursService],
})
export class MurmursModule {}
