import { UserRole } from './user.role';

export interface User {
  username: string;
  email: string;
  password: string;
  role: UserRole;
  is_verified: boolean;
}
