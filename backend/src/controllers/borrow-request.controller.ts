import { Controller, Post, Get, Param, Body, Patch, Delete } from '@nestjs/common';
import { BorrowRequestService } from '../services/borrow-request.services';
import { CreateBorrowRequestDto } from '../dto/users/create-borrow-request.dto';

@Controller('borrow')
export class BorrowRequestController {
  constructor(private readonly borrowService: BorrowRequestService) {}

  @Post()
  create(@Body() dto: CreateBorrowRequestDto) {
    return this.borrowService.create(dto);
  }

  @Get()
  findAll() {
    return this.borrowService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.borrowService.findById(+id);
  }

  @Get('user/:id')
  findByBorrower(@Param('id') id: string) {
    return this.borrowService.findByBorrower(+id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.borrowService.updateStatus(+id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowService.remove(+id);
  }
}
