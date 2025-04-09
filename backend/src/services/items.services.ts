import { Injectable } from '@nestjs/common';
import { CreateItemDto } from '../dto/items/create-item.dto';
import { UpdateItemDto } from '../dto/items/update-item.dto';

@Injectable()
export class ItemsService {
  private items: any[] = []; // Temporary in-memory storage

  createItem(createItemDto: CreateItemDto) {
    const newItem = { id: Date.now(), ...createItemDto };
    this.items.push(newItem);
    return newItem;
  }

  findAllItems() {
    return this.items;
  }

  findOneItem(id: string) {
    return this.items.find((item) => item.id === Number(id));
  }

  updateItem(id: string, updateItemDto: UpdateItemDto) {
    const index = this.items.findIndex((item) => item.id === Number(id));
    if (index > -1) {
      this.items[index] = { ...this.items[index], ...updateItemDto };
      return this.items[index];
    }
    return null;
  }

  removeItem(id: string) {
    const index = this.items.findIndex((item) => item.id === Number(id));
    if (index > -1) {
      const removed = this.items.splice(index, 1);
      return removed[0];
    }
    return null;
  }
}
