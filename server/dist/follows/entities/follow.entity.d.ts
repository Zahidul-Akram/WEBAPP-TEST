import { User } from 'src/users/entities/user.entity';
export declare class Follow {
    id: number;
    follower: User;
    following: User;
    created_at: Date;
}
