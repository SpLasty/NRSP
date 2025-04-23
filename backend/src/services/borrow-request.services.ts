import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BorrowRequest } from '../db/entity/borrow-request.entity';
import { Item } from '../db/entity/item.entity';
import { User } from '../db/entity/user.entity';
import { CreateBorrowRequestDto } from '../dto/users/create-borrow-request.dto';

@Injectable()
export class BorrowRequestService {
  constructor(
    @InjectRepository(BorrowRequest)
    private borrowRepo: Repository<BorrowRequest>,

    @InjectRepository(Item)
    private itemRepo: Repository<Item>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(data: CreateBorrowRequestDto): Promise<BorrowRequest> {
    // Ensure referenced IDs exist
    const itemExists = await this.itemRepo.exist({ where: { id: data.itemId } });
    const borrowerExists = await this.userRepo.exist({ where: { id: data.borrowerId } });

    if (!itemExists || !borrowerExists) {
      throw new NotFoundException('Item or borrower not found');
    }
    const request = this.borrowRepo.create({
      item: { id: data.itemId } as Item,
      borrower: { id: data.borrowerId } as User,
      returnDueDate: data.returnDueDate,
      requestDate: new Date(),
      status: 'pending',
    });

    return this.borrowRepo.save(request);
  }

  async findAll(): Promise<BorrowRequest[]> {
    return this.borrowRepo.find({ relations: ['item', 'borrower'] });
  }

  async findById(id: number): Promise<BorrowRequest | null> {
    return this.borrowRepo.findOne({
      where: { id },
      relations: ['item', 'borrower'],
    });
  }

  // async findByBorrower(borrowerId: number): Promise<BorrowRequest[]> {
  //   return this.borrowRepo.find({
  //     where: { borrower: { id: borrowerId } },
  //     relations: ['item', 'borrower'],
  //   });
  // }
  async findByBorrower(borrowerId: number): Promise<BorrowRequest[]> {
    return this.borrowRepo.find({
      where: { borrower: { id: borrowerId } },
      relations: ['item'],
      order: { requestDate: 'DESC' }
    });
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

  async findForLender(lenderId: number): Promise<BorrowRequest[]> {
    return this.borrowRepo.find({
      relations: ['item', 'item.lender', 'borrower'],
      where: { item: { lender: { id: lenderId } } },  
      order: { requestDate: 'DESC' },
    });
  }
  

  async findByBorrowerAndStatus(
    borrowerId: number,
    status: 'pending' | 'accepted' | 'declined' | 'returned' | 'all' = 'all',
  ): Promise<BorrowRequest[]> {
    return this.borrowRepo.find({
      relations: ['item'],
      where: {
        borrower: { id: borrowerId },
        ...(status !== 'all' ? { status } : {}),
      },
      order: { requestDate: 'DESC' },
    });
  }
}
