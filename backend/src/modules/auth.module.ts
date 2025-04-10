import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from '../controllers/auth.controller';

@Module({
  imports: [
    JwtModule.register({
      secret: 'mySecretKey',              // secret key
      signOptions: { expiresIn: '1h' },   // Token expiry
    }),
  ],
//   providers: [AuthService],
  controllers: [AuthController],
  exports: [JwtModule], // allows other modules to use JWT service
})
export class AuthModule {}
