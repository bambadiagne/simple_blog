import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class CommentsService {
  constructor(private dbService: DatabaseService) {}
  async create(createCommentDto: CreateCommentDto) {
    return await this.dbService.comment.create({
      data: createCommentDto,
    });
  }
  async remove(user_id: number, id: number) {
    return await this.dbService.comment.delete({
      where: {
        id,
        AND: [{ user_id }],
      },
    });
  }
}
