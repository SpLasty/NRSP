import { IsString, IsOptional, IsEnum } from 'class-validator';

export class CreateItemDto {
  @IsString()
  title: string;

  @IsString()
  description?: string;

  @IsString()
  condition: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  // @IsEnum(['pending', 'approved', 'borrowed', 'returned'])
  // status: 'pending' | 'approved' | 'borrowed' | 'returned';

}
  
    

