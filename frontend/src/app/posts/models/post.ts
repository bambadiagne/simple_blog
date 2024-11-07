import { UserResponse } from 'src/app/auth/models/user';
import { Comment } from 'src/app/comments/models/comment';
export interface Post {
  id?: number;
  title: string;
  content: string;
  user_id: number;
  image: string;
  created_at?: Date;
  updated_at?: Date;
  user?: UserResponse;
  comments: Comment[];
}
