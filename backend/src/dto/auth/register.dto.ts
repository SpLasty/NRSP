import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export class RegisterDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(['borrower', 'lender', 'admin'])
  role: 'borrower' | 'lender' | 'admin';

  @IsOptional()
  @IsString()
  location?: string;
}
