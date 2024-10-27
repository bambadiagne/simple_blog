import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class PostsService {
  constructor(private dbService: DatabaseService) {}
  async create(createPostDto: CreatePostDto) {
    return await this.dbService.post.create({ data: createPostDto });
  }

  async findAll() {
    return await this.dbService.post.findMany();
  }

  async findOne(id: number) {
    const post = await this.dbService.post.findUnique({ where: { id } });
    if (!post) {
      throw new BadRequestException(['Post not found']);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.dbService.post.update({
      where: { id },
      data: updatePostDto,
    });
    if (!post) {
      throw new BadRequestException(['Post not found']);
    }

    return await this.dbService.post.update({
      where: { id },
      data: updatePostDto,
    });
  }

  async remove(id: number, userId: number) {
    const deletedPost = await this.dbService.post.delete({
      where: { user_id: userId, id },
    });
    if (!deletedPost) {
      throw new BadRequestException(['Post not found']);
    }
    return deletedPost;
  }
}
