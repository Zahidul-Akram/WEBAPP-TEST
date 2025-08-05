"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const helmet_1 = require("helmet");
const swagger_1 = require("@nestjs/swagger");
const cors = require('cors');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, helmet_1.default)());
    app.use(cors());
    const config = new swagger_1.DocumentBuilder()
        .setTitle('Example API')
        .setDescription('The API description')
        .setVersion('1.0')
        .addTag('example')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config);
    swagger_1.SwaggerModule.setup('api', app, document);
    await app.listen(3001);
    console.log('Example app listening on port 3001!');
}
bootstrap();
//# sourceMappingURL=main.js.map