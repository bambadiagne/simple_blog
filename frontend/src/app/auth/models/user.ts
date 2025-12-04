import { UserRole } from './user.role';

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  role: UserRole;
  is_verified: boolean;
  picture?: string;
}
export type UserCreationPayload = Omit<User, 'is_verified'>;
export type UserLoginPayload = Pick<User, 'email' | 'password'>;
export type UserResponse = Omit<User, 'password'>;
