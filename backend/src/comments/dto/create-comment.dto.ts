import { IsInt, IsString } from 'class-validator';

export class CreateCommentDto {
  user_id: number;
  @IsString()
  content: string;
  @IsInt()
  post_id: number;
}
