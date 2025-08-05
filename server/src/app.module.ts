import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { Murmur } from './murmurs/entities/murmur.entity';
import { User } from './users/entities/user.entity';
import { MurmursModule } from './murmurs/murmurs.module';
import { Like } from './likes/entities/like.entity';
import { LikesModule } from './likes/likes.module';
import { FollowsModule } from './follows/follows.module';
import { Follow } from './follows/entities/follow.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'docker',
      password: 'docker',
      database: 'test',
      entities: [User,Murmur,Like,Follow],
      synchronize: true,
    }),
    UsersModule,
    MurmursModule,
    LikesModule,
    FollowsModule,
    TypeOrmModule.forFeature([User,Murmur,Like,Follow]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
