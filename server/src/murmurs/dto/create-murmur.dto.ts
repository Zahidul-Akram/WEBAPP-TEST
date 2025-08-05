import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateMurmurDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  userId: number;
}