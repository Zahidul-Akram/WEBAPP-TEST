import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MurmursService } from './murmurs.service';
import { CreateMurmurDto } from './dto/create-murmur.dto';
import { UpdateMurmurDto } from './dto/update-murmur.dto';

@Controller('api')
export class MurmursController {
  constructor(private readonly murmurService: MurmursService) { }

  @Post('createMurmur')
  create(@Body() dto: CreateMurmurDto) {
    return this.murmurService.createMurmur(dto);
  }

  @Get('allMurmurs')
  findAll(@Query('page') page: string) {
    return this.murmurService.findAll(Number(page) || 1);
  }

  @Get('findOneMurmur/:id')
  findOne(@Param('id') id: string) {
    return this.murmurService.findOne(+id);
  }

  @Get('getTimelineByUserId/:userId')
  getTimelineByUserId(@Param('userId') userId: number, @Query('page') page: number) {
    return this.murmurService.getTimelineByUserId(userId,page);
  }

  @Delete('deleteMurmur/:id')
  delete(@Param('id') id: number, @Query('userId') userId: number) {
    return this.murmurService.delete(id, userId);
  }
}
