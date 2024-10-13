import { IsEmail, IsEnum, IsNotEmpty, Matches } from 'class-validator';

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}
export class CreateUserDto {
  @IsNotEmpty({ message: "Le nom d'utilisateur est obligatoire" })
  username: string;
  @IsEmail({}, { message: 'Email invalide' })
  email: string;
  @IsNotEmpty({ message: 'Le mot de passe est obligatoire' })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, {
    message:
      'Le mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial',
  })
  password: string;
  @IsEnum(UserRole, { message: 'Le role doit être user ou admin' })
  role: UserRole;
}
