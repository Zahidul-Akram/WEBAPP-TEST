import { Repository } from 'typeorm';
import { Follow } from './entities/follow.entity';
import { User } from 'src/users/entities/user.entity';
export declare class FollowsService {
    private followRepository;
    private userRepository;
    constructor(followRepository: Repository<Follow>, userRepository: Repository<User>);
    followAUser(followingId: number, followerId: number): Promise<Follow>;
    unfollowAUser(followingId: number, followerId: number): Promise<void>;
    getFollowers(userId: number): Promise<User[]>;
    getFollowing(userId: number): Promise<User[]>;
    getFollowingIds(userId: number): Promise<number[]>;
}
