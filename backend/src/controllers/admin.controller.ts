import { Controller, Get, Post, Body, Delete, Param } from '@nestjs/common';
import { AdminService } from '../services/admin.services';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/guards/auth.guard';
import { RolesGuard } from 'src/common/guards/roles.guard';

@UseGuards(AuthGuard,RolesGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('reports')
  getReports() {
    return this.adminService.getReports();
  }

  @Post('action')
  takeAction(@Body() actionBody: any) {
    return this.adminService.takeAction(actionBody);
  }

  @Delete('users/:id')
  @Roles('admin') 
  removeUser(@Param('id') id: string) {
    return `User with ID ${id} removed!`;
  }
}
