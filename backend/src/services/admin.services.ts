import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../db/entity/user.entity'
import { Item } from '../db/entity/item.entity';
import { BorrowRequest } from '../db/entity/borrow-request.entity';
import { Not } from 'typeorm';


@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Item) private itemRepo: Repository<Item>,
    @InjectRepository(BorrowRequest) private requestRepo: Repository<BorrowRequest>,
  ) {}

  findAllUsers() {
    return this.userRepo.find({
      where: { role: Not('admin') },
    });
  }
  

  findAllItems() {
    return this.itemRepo.find({ relations: ['lender'] });
  }

  findAllBorrowRequests() {
    return this.requestRepo.find({ relations: ['item', 'borrower'] });
  }

  async approveItem(id: number) {
    const item = await this.itemRepo.findOneBy({ id });
    if (item) {
      item.status = 'approved';
      return this.itemRepo.save(item);
    }
  }

  async rejectItem(id: number) {
    const item = await this.itemRepo.findOneBy({ id });
    if (item) {
      item.status = 'pending';
      return this.itemRepo.remove(item);
    }
  }
  
  async findAllListings() {
    return this.itemRepo.find({
      relations: ['lender', 'borrowRequests', 'borrowRequests.borrower'],
      order: { createdAt: 'DESC' },
    });
  }
  

  deleteUser(id: number) {
    return this.userRepo.delete(id);
  }

  deleteItem(id: number) {
    return this.itemRepo.delete(id);
  }
}
