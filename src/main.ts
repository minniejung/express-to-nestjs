import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable validation globally for all DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strip properties not in DTO
      forbidNonWhitelisted: true, // throw error if unknown props are present
      transform: true, // auto-transform payloads to DTO classes
    }),
  );

  await app.listen(process.env.PORT ?? 9090);
}
bootstrap();
