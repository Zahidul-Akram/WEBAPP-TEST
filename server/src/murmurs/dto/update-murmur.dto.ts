import { PartialType } from '@nestjs/swagger';
import { CreateMurmurDto } from './create-murmur.dto';

export class UpdateMurmurDto extends PartialType(CreateMurmurDto) {}
