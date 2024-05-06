import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module';
import * as fs from 'fs';

var cors = require('cors');

const httpsOptions = {
  key: fs.readFileSync('./secrets/cert.key'),
  cert: fs.readFileSync('./secrets/cert.crt'),
};


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });
  //app.use(cors());
  app.use(cookieParser());
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));
  await app.listen(3200);
}
bootstrap();
