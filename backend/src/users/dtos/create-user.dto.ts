import { IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export class CreateUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  username: string;
  @IsEmail({}, { message: 'Invalid email' })
  email: string;
  @IsNotEmpty({ message: 'Password is required' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message:
      'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character',
  })
  password: string;
  @IsEnum(UserRole, { message: 'Role must be either user or admin' })
  role: UserRole;
  picture?: string;
}
