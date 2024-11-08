import { IsInt, IsNotEmpty } from 'class-validator';
import { IsOptional } from 'class-validator';

export class CreatePostDto {
  @IsNotEmpty({ message: 'Please enter a title' })
  title: string;
  @IsNotEmpty({ message: 'Please enter some content' })
  content: string;
  user_id: number;
  @IsOptional()
  image: string;
}
