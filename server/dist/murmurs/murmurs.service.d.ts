import { CreateMurmurDto } from './dto/create-murmur.dto';
import { Murmur } from './entities/murmur.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
export declare class MurmursService {
    private murmurRepository;
    private userRepository;
    constructor(murmurRepository: Repository<Murmur>, userRepository: Repository<User>);
    createMurmur(createMurmurDto: CreateMurmurDto): Promise<Murmur>;
    findAll(page?: number): Promise<Murmur[]>;
    findOne(id: number): Promise<Murmur>;
    delete(id: number, userId: number): Promise<Murmur>;
}
