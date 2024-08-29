import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from 'body-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({origin: 'http://localhost:4200',})
  // app.use(bodyParser.json())
  await app.listen(3000);
}
bootstrap()