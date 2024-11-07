import { User } from 'src/app/auth/models/user';

export interface Comment {
  created_at?: Date;
  id?: number;
  content: string;
  post_id: number;
  user?: User;
}
