import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import { LenderService } from '../services/lender.services';

@Controller('lender')
export class LenderController {
  constructor(private readonly lenderService: LenderService) {}

  @Get('requests/:id') 
  getLenderRequests(@Param('id') id: string) {
    return this.lenderService.getBorrowRequestsForLender(+id);
  }

  @Patch('requests/:id/status')
  updateRequestStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.lenderService.updateBorrowRequestStatus(+id, status);
  }
}
