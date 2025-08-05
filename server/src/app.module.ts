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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'docker',
      password: 'docker',
      database: 'test',
      entities: [User,Murmur,Like],
      synchronize: true,
    }),
    UsersModule,
    MurmursModule,
    LikesModule,
    TypeOrmModule.forFeature([User,Murmur,Like]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
