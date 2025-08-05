import { Murmur } from 'src/murmurs/entities/murmur.entity';
export declare class User {
    id: number;
    username: string;
    name: string;
    email: string;
    isActive: boolean;
    createdAt: Date;
    murmurs: Murmur[];
}
