import {
  Controller,
  Post,
  Get,
  Param,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { BorrowRequestService } from '../services/borrow-request.services';
import { CreateBorrowRequestDto } from '../dto/users/create-borrow-request.dto';

@Controller('borrow')
export class BorrowRequestController {
  constructor(private readonly borrowService: BorrowRequestService) {}

  // ✅ Create a borrow request
  @Post()
  create(@Body() dto: CreateBorrowRequestDto) {
    return this.borrowService.create(dto);
  }

  // ✅ Get all borrow requests
  @Get()
  findAll() {
    return this.borrowService.findAll();
  }

  // ✅ Get borrow request by ID
  @Get(':id')
  findById(@Param('id') id: string) {
    return this.borrowService.findById(+id);
  }

  // ✅ Get all requests made by a specific borrower
  @Get('user/:id')
  findByBorrower(@Param('id') id: string) {
    return this.borrowService.findByBorrower(+id);
  }

  // ✅ Update borrow request status (accept/decline/returned)
  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.borrowService.updateStatus(+id, status);
  }

  // ✅ Delete a borrow request (e.g. canceled by borrower or admin)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.borrowService.remove(+id);
  }
  
}
