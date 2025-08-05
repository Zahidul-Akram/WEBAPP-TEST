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
exports.MurmursService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const murmur_entity_1 = require("./entities/murmur.entity");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("../users/entities/user.entity");
const follows_service_1 = require("../follows/follows.service");
let MurmursService = class MurmursService {
    constructor(murmurRepository, userRepository, followsService) {
        this.murmurRepository = murmurRepository;
        this.userRepository = userRepository;
        this.followsService = followsService;
    }
    async createMurmur(createMurmurDto) {
        const user = await this.userRepository.findOne({ where: {
                id: createMurmurDto.userId
            } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const murmur = await this.murmurRepository.create({
            text: createMurmurDto.text,
            user,
        });
        return await this.murmurRepository.save(murmur);
    }
    async findAll(page = 1) {
        return this.murmurRepository.find({
            order: { createdAt: 'DESC' },
            relations: ['user'],
            take: 10,
            skip: (page - 1) * 10,
        });
    }
    async findOne(id) {
        return this.murmurRepository.findOne({
            where: { id },
            relations: ['user'],
        });
    }
    async delete(id, userId) {
        const murmur = await this.murmurRepository.findOne({
            where: { id },
            relations: ['user'],
        });
        if (!murmur)
            throw new common_1.NotFoundException('Murmur not found');
        if (murmur.user.id != userId)
            throw new common_1.NotFoundException('Forbidden');
        return await this.murmurRepository.remove(murmur);
    }
    async getTimelineByUserId(userId, page) {
        const followingIds = await this.followsService.getFollowingIds(userId);
        return this.murmurRepository.find({
            where: { user: { id: (0, typeorm_2.In)([...followingIds, userId]) } },
            order: { createdAt: 'DESC' },
            relations: ['user'],
            take: 10,
            skip: (page - 1) * 10,
        });
    }
};
exports.MurmursService = MurmursService;
exports.MurmursService = MurmursService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(murmur_entity_1.Murmur)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        follows_service_1.FollowsService])
], MurmursService);
//# sourceMappingURL=murmurs.service.js.map