"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const murmurs_service_1 = require("./murmurs.service");
describe('MurmursService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [murmurs_service_1.MurmursService],
        }).compile();
        service = module.get(murmurs_service_1.MurmursService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=murmurs.service.spec.js.map