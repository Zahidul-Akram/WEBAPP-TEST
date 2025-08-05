import { FollowsService } from './follows.service';
export declare class FollowsController {
    private readonly followsService;
    constructor(followsService: FollowsService);
    follow(followingId: number, followerId: number): Promise<import("./entities/follow.entity").Follow>;
    unfollow(followingId: number, followerId: number): Promise<void>;
    getFollowers(userId: string): Promise<import("../users/entities/user.entity").User[]>;
    getFollowing(userId: string): Promise<import("../users/entities/user.entity").User[]>;
}
