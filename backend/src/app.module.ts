import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from '../test/test.entity';
import { ItemsModule } from './modules/items.module';
import { UsersModule } from './modules/users.module';
import { AdminModule } from './modules/admin.module';
import { AuthModule } from './modules/auth.module';
import { BorrowRequestModule } from './modules/borrow-request.module';




@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
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
    BorrowRequestModule

  ],
  controllers: [],    //These stay empty since we are directly importing the Modules and those modules register their own controllers and services(providers)
  providers: [],

})
export class AppModule {}
