import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowRequest } from '../db/entity/borrow-request.entity';
import { Item } from '../db/entity/item.entity';
import { User } from '../db/entity/user.entity';

@Injectable()
export class BorrowRequestService {
  constructor(
    @InjectRepository(BorrowRequest)
    private borrowRepo: Repository<BorrowRequest>,
  ) {}

  async create(data: Partial<BorrowRequest>): Promise<BorrowRequest> {
    const request = this.borrowRepo.create(data);
    return this.borrowRepo.save(request);
  }

  async findAll(): Promise<BorrowRequest[]> {
    return this.borrowRepo.find({ relations: ['item', 'borrower'] });
  }

  async findById(id: number): Promise<BorrowRequest | null> {
    return this.borrowRepo.findOne({ where: { id }, relations: ['item', 'borrower'] });
  }

  async findByBorrower(borrowerId: number): Promise<BorrowRequest[]> {
    return this.borrowRepo.find({ where: { borrower: { id: borrowerId } }, relations: ['item', 'borrower'] });
  }

  async updateStatus(id: number, status: string): Promise<BorrowRequest | null> {
    const request = await this.findById(id);
    if (!request) return null;
    request.status = status as any;
    return this.borrowRepo.save(request);
  }

  async remove(id: number) {
    return this.borrowRepo.delete(id);
  }
}
