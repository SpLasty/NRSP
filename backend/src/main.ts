import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalGuards(new JwtAuthGuard()); // ✅ Secure all routes by default
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })); // ✅ DTO validation
  app.enableCors({ origin: 'http://localhost:3000', credentials: true }); // ✅ Frontend access

  await app.listen(3000);
}
bootstrap();
