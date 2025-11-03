import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as fs from 'fs';
import { ValidationPipe } from '@nestjs/common';

const httpsOptions = {
  key: fs.readFileSync('src/common/secrets/cert.key'),
  cert: fs.readFileSync('src/common/secrets/cert.crt'),
};

async function bootstrap() {

  const app = await NestFactory.create(AppModule ,{httpsOptions});
  
  // Habilitar CORS
  app.enableCors();

  // Habilita o uso de pipes de validação globalmente
  app.useGlobalPipes(new ValidationPipe());

  app.enableShutdownHooks(); // Habilita os hooks de desligamento
  
  await app.listen(process.env.PORT ?? 7777);

}
bootstrap();
