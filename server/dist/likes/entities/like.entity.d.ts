import { Murmur } from 'src/murmurs/entities/murmur.entity';
import { User } from 'src/users/entities/user.entity';
export declare class Like {
    id: number;
    user: User;
    murmur: Murmur;
    createdAt: Date;
}
