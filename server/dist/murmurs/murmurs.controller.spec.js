"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const murmurs_controller_1 = require("./murmurs.controller");
const murmurs_service_1 = require("./murmurs.service");
describe('MurmursController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [murmurs_controller_1.MurmursController],
            providers: [murmurs_service_1.MurmursService],
        }).compile();
        controller = module.get(murmurs_controller_1.MurmursController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=murmurs.controller.spec.js.map