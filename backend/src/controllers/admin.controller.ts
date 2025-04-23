import { UseGuards } from '@nestjs/common';
import {Roles} from '../common/decorators/roles.decorator';
import { Controller, Get, Patch, Delete, Param } from '@nestjs/common';
import { RolesGuard } from '../common/guards/roles.guard';
import { AdminService } from '../services/admin.services';

@UseGuards(RolesGuard)
@Roles('admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('users')
  getAllUsers() {
    return this.adminService.findAllUsers();
  }

  @Get('items')
  getAllItems() {
    return this.adminService.findAllItems();
  }

  @Get('requests')
  getAllRequests() {
    return this.adminService.findAllBorrowRequests();
  }

  @Patch('items/:id/approve')
  approveItem(@Param('id') id: string) {
    return this.adminService.approveItem(+id);
  }

  @Patch('items/:id/reject')
  rejectItem(@Param('id') id: string) {
    return this.adminService.rejectItem(+id);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string) {
    return this.adminService.deleteUser(+id);
  }

  @Delete('items/:id')
  deleteItem(@Param('id') id: string) {
    return this.adminService.deleteItem(+id);
  }

  @Get('listings')
  getAllListings() {
  return this.adminService.findAllListings();
}

}
