import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../db/entity/user.entity';
import { Item } from '../db/entity/item.entity';
import { BorrowRequest } from '../db/entity/borrow-request.entity';
import { AdminController } from '../controllers/admin.controller';
import { AdminService } from '../services/admin.services';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Item, BorrowRequest]),
  ],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}