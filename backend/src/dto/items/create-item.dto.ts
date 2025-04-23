import {IsString, IsOptional, IsEnum, IsUrl, IsNumber, ValidateNested, IsObject
} from 'class-validator';
import { Type } from 'class-transformer';

export enum ItemStatus {
  PENDING  = 'pending',
  APPROVED = 'approved',
  BORROWED = 'borrowed',
  RETURNED = 'returned',
}

export enum Condition {
  NEW  = 'new',
  GOOD = 'good',
  FAIR = 'fair',
  POOR = 'poor',
}

class LocationDto {
  @IsNumber() lat: number;
  @IsNumber() lng: number;
}

export class CreateItemDto {
  @IsString()
  title: string;

  @IsOptional() @IsString()
  description?: string;

  @IsString()
  condition: string;

  @IsOptional() @IsString()
  category?: string;

  @IsOptional()
  imageUrl?: string;

  @IsOptional() @IsEnum(ItemStatus)
  status?: ItemStatus;

  @IsOptional()
  @ValidateNested()
  @Type(() => LocationDto)
  @IsObject()
  location?: LocationDto;
}
