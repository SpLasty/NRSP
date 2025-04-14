import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BorrowRequest } from '../db/entity/borrow-request.entity';
import { BorrowRequestService } from '../services/borrow-request.services';
import { BorrowRequestController } from '../controllers/borrow-request.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowRequest])],
  providers: [BorrowRequestService],
  controllers: [BorrowRequestController],
  exports: [BorrowRequestService],
})
export class BorrowRequestModule {}