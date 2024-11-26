import { User } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';

export class CodeVerificationDto {
  @IsNotEmpty()
  code: string;
  user_id: number;
  user: User;
}
