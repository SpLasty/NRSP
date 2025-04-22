import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemsModule } from './modules/items.module';
import { UsersModule } from './modules/users.module';
import { AdminModule } from './modules/admin.module';
import { AuthModule } from './modules/auth.module';
import { BorrowRequestModule } from './modules/borrow-request.module';
import { LenderController } from './controllers/lender.controller';
import { LenderService } from './services/lender.services';
import { LenderModule } from './modules/lender.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: +process.env.POSTGRES_PORT,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    ItemsModule,
    UsersModule,
    AdminModule,
    AuthModule,
    BorrowRequestModule,
    LenderModule
  ]
})
export class AppModule {}
