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
exports.MurmursController = void 0;
const common_1 = require("@nestjs/common");
const murmurs_service_1 = require("./murmurs.service");
const create_murmur_dto_1 = require("./dto/create-murmur.dto");
let MurmursController = class MurmursController {
    constructor(murmurService) {
        this.murmurService = murmurService;
    }
    create(dto) {
        return this.murmurService.createMurmur(dto);
    }
    findAll(page) {
        return this.murmurService.findAll(Number(page) || 1);
    }
    findOne(id) {
        return this.murmurService.findOne(+id);
    }
    getTimelineByUserId(userId, page) {
        return this.murmurService.getTimelineByUserId(userId, page);
    }
    delete(id, userId) {
        return this.murmurService.delete(id, userId);
    }
};
exports.MurmursController = MurmursController;
__decorate([
    (0, common_1.Post)('createMurmur'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_murmur_dto_1.CreateMurmurDto]),
    __metadata("design:returntype", void 0)
], MurmursController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('allMurmurs'),
    __param(0, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MurmursController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findOneMurmur/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MurmursController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)('getTimelineByUserId/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __param(1, (0, common_1.Query)('page')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MurmursController.prototype, "getTimelineByUserId", null);
__decorate([
    (0, common_1.Delete)('deleteMurmur/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], MurmursController.prototype, "delete", null);
exports.MurmursController = MurmursController = __decorate([
    (0, common_1.Controller)('api'),
    __metadata("design:paramtypes", [murmurs_service_1.MurmursService])
], MurmursController);
//# sourceMappingURL=murmurs.controller.js.map