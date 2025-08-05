"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const likes_controller_1 = require("./likes.controller");
const likes_service_1 = require("./likes.service");
describe('LikesController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [likes_controller_1.LikesController],
            providers: [likes_service_1.LikesService],
        }).compile();
        controller = module.get(likes_controller_1.LikesController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=likes.controller.spec.js.map