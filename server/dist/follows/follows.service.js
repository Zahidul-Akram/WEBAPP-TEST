"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FollowsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const follow_entity_1 = require("./entities/follow.entity");
const user_entity_1 = require("../users/entities/user.entity");
let FollowsService = class FollowsService {
    constructor(followRepository, userRepository) {
        this.followRepository = followRepository;
        this.userRepository = userRepository;
    }
    async followAUser(followingId, followerId) {
        if (followerId === followingId)
            throw new common_1.BadRequestException('Cannot follow self');
        const follower = await this.userRepository.findOneBy({ id: followerId });
        const following = await this.userRepository.findOneBy({ id: followingId });
        if (!follower || !following)
            throw new common_1.NotFoundException('User not found');
        const follow = this.followRepository.create({ follower, following });
        return await this.followRepository.save(follow);
    }
    async unfollowAUser(followingId, followerId) {
        const follow = await this.followRepository.findOne({
            where: {
                follower: { id: followerId },
                following: { id: followingId },
            },
            relations: ['follower', 'following'],
        });
        if (!follow)
            throw new common_1.NotFoundException('Not following');
        await await this.followRepository.remove(follow);
    }
    async getFollowers(userId) {
        const results = await this.followRepository.find({
            where: { following: { id: userId } },
            relations: ['follower'],
        });
        return await results.map(f => f.follower);
    }
    async getFollowing(userId) {
        const results = await this.followRepository.find({
            where: { follower: { id: userId } },
            relations: ['following'],
        });
        return await results.map(f => f.following);
    }
    async getFollowingIds(userId) {
        const results = await this.followRepository.find({
            where: { follower: { id: userId } },
            relations: ['following'],
        });
        return await results.map(f => f.following.id);
    }
};
exports.FollowsService = FollowsService;
exports.FollowsService = FollowsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(follow_entity_1.Follow)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], FollowsService);
//# sourceMappingURL=follows.service.js.map