// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// import helmet from 'helmet';
// const cors = require('cors');

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
  
//   // ミドルウェアの設定
//   app.use(helmet());
//   app.use(cors());
  
//   await app.listen(3001);
//   console.log('Example app listening on port 3001!');
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const cors = require('cors');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(helmet());
  app.use(cors());

  const config = new DocumentBuilder()
    .setTitle('Example API')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('example')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger UI available at http://localhost:3001/api

  await app.listen(3001);
  console.log('Example app listening on port 3001!');
}
bootstrap();
