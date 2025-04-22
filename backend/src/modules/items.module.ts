import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuid } from 'uuid';
import { Item } from '../db/entity/item.entity';
import { ItemsService } from '../services/items.services';
import { ItemsController } from '../controllers/items.controller';
import { UsersModule } from './users.module';          

@Module({
  imports: [
    UsersModule,
    TypeOrmModule.forFeature([Item]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const ext = file.originalname.split('.').pop();
          cb(null, `${uuid()}.${ext}`);
        },
      }),
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
      fileFilter: (_req, file, cb) => {
        const ok = /^image\/(jpeg|png|webp)$/.test(file.mimetype);
        cb(null, ok);
      },
    }),
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}