"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const murmur_entity_1 = require("./murmurs/entities/murmur.entity");
const user_entity_1 = require("./users/entities/user.entity");
const murmurs_module_1 = require("./murmurs/murmurs.module");
const like_entity_1 = require("./likes/entities/like.entity");
const likes_module_1 = require("./likes/likes.module");
const follows_module_1 = require("./follows/follows.module");
const follow_entity_1 = require("./follows/entities/follow.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'docker',
                password: 'docker',
                database: 'test',
                entities: [user_entity_1.User, murmur_entity_1.Murmur, like_entity_1.Like, follow_entity_1.Follow],
                synchronize: true,
            }),
            users_module_1.UsersModule,
            murmurs_module_1.MurmursModule,
            likes_module_1.LikesModule,
            follows_module_1.FollowsModule,
            typeorm_1.TypeOrmModule.forFeature([user_entity_1.User, murmur_entity_1.Murmur, like_entity_1.Like, follow_entity_1.Follow]),
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map