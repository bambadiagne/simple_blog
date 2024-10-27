import { IsInt, IsNotEmpty } from 'class-validator';
import { IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty()
  title: string;
  @IsNotEmpty()
  content: string;
  user_id: number;
  @IsOptional()
  image: string;
}
