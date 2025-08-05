import { LikesService } from './likes.service';
export declare class LikesController {
    private readonly likesService;
    constructor(likesService: LikesService);
    like(murmurId: number, userId: number): Promise<import("./entities/like.entity").Like>;
    unlike(murmurId: number, userId: number): Promise<void>;
    count(murmurId: string): Promise<number>;
}
