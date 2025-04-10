import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TestEntity } from '../test/test.entity';
import { ItemsModule } from './modules/items.module';
import { UsersModule } from './modules/users.module';
import { AdminModule } from './modules/admin.module';


// @Module({
//   imports: [
//     MongooseModule.forRoot('mongodb://localhost/neighborhood-sharing'),
//     ItemsModule,
//     UsersModule,
//     AdminModule,
//   ],
// })

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
      entities: [TestEntity],
      synchronize: true, 
      logging: true,      
    }),
    ItemsModule,
    UsersModule,
    AdminModule
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
