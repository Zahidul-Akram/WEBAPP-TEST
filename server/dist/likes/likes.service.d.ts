import { Like } from './entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import { Murmur } from 'src/murmurs/entities/murmur.entity';
import { Repository } from 'typeorm';
export declare class LikesService {
    private likeRepository;
    private userRepository;
    private murmurRepository;
    constructor(likeRepository: Repository<Like>, userRepository: Repository<User>, murmurRepository: Repository<Murmur>);
    doLike(murmurId: number, userId: number): Promise<Like>;
    doUnlike(murmurId: number, userId: number): Promise<void>;
    countLikes(murmurId: number): Promise<number>;
}
