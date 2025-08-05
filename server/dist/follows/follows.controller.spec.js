"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const follows_controller_1 = require("./follows.controller");
const follows_service_1 = require("./follows.service");
describe('FollowsController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [follows_controller_1.FollowsController],
            providers: [follows_service_1.FollowsService],
        }).compile();
        controller = module.get(follows_controller_1.FollowsController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=follows.controller.spec.js.map