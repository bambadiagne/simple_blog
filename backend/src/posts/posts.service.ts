import { BadRequestException, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { DatabaseService } from 'src/database/database.service';
import { QueryPaginationDTO } from 'src/common/dto/query-pagination';
import { Prisma } from '@prisma/client';
@Injectable()
export class PostsService {
  constructor(private dbService: DatabaseService) {}
  async create(createPostDto: CreatePostDto) {
    return await this.dbService.post.create({ data: createPostDto });
  }

  async findAll(query: QueryPaginationDTO) {
    let where: Prisma.PostWhereInput = {};
    if (query.searchTerm) {
      where = {
        OR: [
          {
            title: {
              contains: query.searchTerm,
              mode: 'insensitive',
            },
          },
          {
            content: {
              contains: query.searchTerm,
              mode: 'insensitive',
            },
          },
        ],
      };
    }
    const total = await this.dbService.post.count({ where });
    const posts = await this.dbService.post.findMany({
      where,
      include: {
        user: {
          select: {
            username: true,
            id: true,
          },
        },
      },
      skip: query.perPage * query.page,
      take: query.perPage,
    });
    return { data: posts, total };
  }

  async findOne(id: number) {
    const post = await this.dbService.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        comments: {
          select: {
            id: true,
            user: {
              select: {
                id: true,
                username: true,
                email: true,
              },
            },
            created_at: true,
            content: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
    });
    if (!post) {
      throw new BadRequestException('Post not found');
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.dbService.post.update({
      where: { id },
      data: updatePostDto,
    });
    if (!post) {
      throw new BadRequestException('Post not found');
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
      throw new BadRequestException('Post not found');
    }
    return deletedPost;
  }
  async findAllByUser(query, id: number) {
    let where: Prisma.PostWhereInput = {
      user_id: id,
    };
    const total = await this.dbService.post.count({ where });
    const posts = await this.dbService.post.findMany({
      where,
      include: {
        user: {
          select: {
            username: true,
            id: true,
          },
        },
      },
      skip: query.perPage * query.page,
      take: query.perPage,
    });
    return { data: posts, total };
  }
}
