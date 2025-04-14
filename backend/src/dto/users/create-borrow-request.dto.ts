import { IsInt, IsOptional, IsDateString } from 'class-validator';

export class CreateBorrowRequestDto {
  @IsInt()
  itemId: number;

  @IsInt()
  borrowerId: number;

  @IsOptional()
  @IsDateString()
  returnDueDate?: string;
}
