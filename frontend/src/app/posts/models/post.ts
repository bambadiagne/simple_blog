import { UserResponse } from 'src/app/auth/models/user';

export interface Post {
  id?: number;
  title: string;
  content: string;
  user_id: number;
  image: string;
  created_at?: Date;
  updated_at?: Date;
  user?: UserResponse;
}
