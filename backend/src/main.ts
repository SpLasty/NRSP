import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { join } from 'path';

// Load environment variables from .env file before everything
dotenv.config({ path: join(__dirname, '..', '.env') });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new JwtAuthGuard()); // ✅ Secure all routes by default
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // ✅ DTO validation
  app.enableCors({ origin: 'http://localhost:3000', credentials: true }); // ✅ Frontend access

  await app.listen(3000);
  console.log({
    POSTGRES_HOST: process.env.POSTGRES_HOST,
    POSTGRES_PORT: process.env.POSTGRES_PORT,
    POSTGRES_USER: process.env.POSTGRES_USER,
    POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD,
    POSTGRES_DB: process.env.POSTGRES_DB,
  });
}
bootstrap();