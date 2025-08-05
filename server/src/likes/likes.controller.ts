import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { LikesService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Controller('api')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('likeMurmurByUserId/:id')
  like(@Param('id') murmurId: number, @Query('userId') userId: number) {
    return this.likesService.doLike(murmurId,userId);
  }

  @Delete('unlikeMurmurByUserId/:id')
  unlike(@Param('id') murmurId: number, @Query('userId') userId: number) {
    return this.likesService.doUnlike(murmurId,userId);
  }

  @Get('countMurmurLikes/:id')
  count(@Param('id') murmurId: string) {
    return this.likesService.countLikes(+murmurId);
  }
}
