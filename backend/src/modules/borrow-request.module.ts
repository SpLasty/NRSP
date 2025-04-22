import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowRequest } from '../db/entity/borrow-request.entity';
import { Item } from '../db/entity/item.entity';
import { User } from '../db/entity/user.entity';
import { BorrowRequestService } from '../services/borrow-request.services';
import { BorrowRequestController } from '../controllers/borrow-request.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([BorrowRequest, Item, User]), // ✅ this line makes repos injectable
  ],
  controllers: [BorrowRequestController],
  providers: [BorrowRequestService],
})
export class BorrowRequestModule {}
