import { UserRole } from './user.role';

export interface User {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  is_verified: boolean;
}
export type UserCreationPayload = Omit<User, 'is_verified'>;

export type UserResponse = Omit<User, 'password'>;
