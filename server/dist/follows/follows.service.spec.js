"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const follows_service_1 = require("./follows.service");
describe('FollowsService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [follows_service_1.FollowsService],
        }).compile();
        service = module.get(follows_service_1.FollowsService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=follows.service.spec.js.map