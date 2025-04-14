import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../db/entity/item.entity';
import { User } from '../db/entity/user.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private itemRepo: Repository<Item>,
  ) {}

  async findAll(): Promise<Item[]> {
    return this.itemRepo.find({
      relations: ['lender'], // Include the lender relation to get the user who created the item
    });
  }
  

  findById(id: number) {
    return this.itemRepo.findOne({ where: { id }, relations: ['lender'] });
  }

  create(data: Partial<Item>) {
    const item = this.itemRepo.create(data);
    return this.itemRepo.save(item);
  }

  update(id: number, data: Partial<Item>) {
    return this.itemRepo.update(id, data);
  }

  remove(id: number) {
    return this.itemRepo.delete(id);
  }
}
