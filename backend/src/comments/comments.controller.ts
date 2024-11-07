import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  BadRequestException,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { PostsService } from 'src/posts/posts.service';

@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService,
    private postsService: PostsService,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  async create(@Req() req, @Body() createCommentDto: CreateCommentDto) {
    const post = this.postsService.findOne(createCommentDto.post_id);
    if (!post) {
      throw new BadRequestException('No Post Found');
    }
    createCommentDto.user_id = req.user.id;

    return this.commentsService.create(createCommentDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  remove(@Req() req, @Param('id') id: string) {
    return this.commentsService.remove(req.user.id, +id);
  }
}
