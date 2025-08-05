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
exports.LikesService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const like_entity_1 = require("./entities/like.entity");
const user_entity_1 = require("../users/entities/user.entity");
const murmur_entity_1 = require("../murmurs/entities/murmur.entity");
const typeorm_2 = require("typeorm");
let LikesService = class LikesService {
    constructor(likeRepository, userRepository, murmurRepository) {
        this.likeRepository = likeRepository;
        this.userRepository = userRepository;
        this.murmurRepository = murmurRepository;
    }
    async doLike(murmurId, userId) {
        const user = await this.userRepository.findOneBy({ id: userId });
        const murmur = await this.murmurRepository.findOneBy({ id: murmurId });
        if (!user || !murmur)
            throw new common_1.NotFoundException('User or Murmur not found');
        const like = this.likeRepository.create({ user, murmur });
        return await this.likeRepository.save(like);
    }
    async doUnlike(murmurId, userId) {
        const like = await this.likeRepository.findOne({
            where: {
                user: { id: userId },
                murmur: { id: murmurId },
            },
            relations: ['user', 'murmur'],
        });
        if (!like)
            throw new common_1.NotFoundException('User did not like this murmur');
        await await this.likeRepository.remove(like);
    }
    async countLikes(murmurId) {
        return await this.likeRepository.count({ where: { murmur: { id: murmurId } } });
    }
};
exports.LikesService = LikesService;
exports.LikesService = LikesService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(like_entity_1.Like)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(murmur_entity_1.Murmur)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LikesService);
//# sourceMappingURL=likes.service.js.map