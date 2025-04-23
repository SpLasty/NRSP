// modules/lender.module.ts
import { Module } from '@nestjs/common';
import { LenderController } from '../controllers/lender.controller';
import { LenderService } from '../services/lender.services';

@Module({
  controllers: [LenderController],
  providers: [LenderService],
})
export class LenderModule {}
