import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { FollowsService } from './follows.service';
import { CreateFollowDto } from './dto/create-follow.dto';
import { UpdateFollowDto } from './dto/update-follow.dto';

@Controller('api')
export class FollowsController {
  constructor(private readonly followsService: FollowsService) {}

  @Post('followAUser/:id')
  follow(@Param('id') followingId: number, @Query('userId') followerId: number) {
    return this.followsService.followAUser(followingId, followerId);
  }

  @Delete('unfollowAUser/:id')
  unfollow(@Param('id') followingId: number, @Query('userId') followerId: number) {
    return this.followsService.unfollowAUser(followingId, followerId);
  }

  @Get('followersByUserId/:id')
  getFollowers(@Param('id') userId: string) {
    return this.followsService.getFollowers(+userId);
  }

  @Get('followingByUserId/:id')
  getFollowing(@Param('id') userId: string) {
    return this.followsService.getFollowing(+userId);
  }
}
