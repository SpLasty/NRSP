import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @MinLength(6)
  password: string;

  @IsEnum(['borrower', 'lender', 'admin'])
  role: 'borrower' | 'lender' | 'admin';

  @IsOptional()
  @IsString()
  location?: string;
}
