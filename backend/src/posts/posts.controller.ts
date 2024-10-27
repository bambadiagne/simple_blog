import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  Req,
  ParseIntPipe,
  BadRequestException,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { CustomFileInterceptor } from 'src/common/interceptors/file.interceptor';
import { S3Service } from 'src/common/services/s3.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private fileService: S3Service,
  ) {}

  @UseGuards(JwtGuard)
  @Post()
  @UseInterceptors(
    new CustomFileInterceptor({
      fieldName: 'image',
      maxSize: 2 * 1024 * 1024,
      allowedExtensions: ['jpg', 'jpeg', 'png'],
    }),
  )
  async create(
    @Req() req,
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const image = await this.fileService.uploadFile(file);
    if (!image) {
      throw new BadRequestException(['Error uploading file']);
    }
    createPostDto.image = image;
    createPostDto.user_id = req.user.id;
    return await this.postsService.create(createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @UseGuards(JwtGuard)
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @UseGuards(JwtGuard)
  @Patch(':id/image')
  @UseInterceptors(
    new CustomFileInterceptor({
      fieldName: 'image',
      maxSize: 2 * 1024 * 1024,
      allowedExtensions: ['jpg', 'jpeg', 'png'],
    }),
  )
  async updateImage(
    @Req() req,
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const post = await this.postsService.findOne(id);
    if (!post) {
      throw new BadRequestException(['Post not found']);
    }
    if (post.user_id !== req.user.id) {
      throw new BadRequestException(['Unauthorized to update post']);
    }
    const image = await this.fileService.uploadFile(file);
    if (!image) {
      throw new BadRequestException(['Error uploading file']);
    }
    return this.postsService.update(+id, { image });
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    const deletedPost = await this.postsService.remove(id, req.user.id);
    await this.fileService.deleteFile(deletedPost.image.split('/').pop());

    return { isDeleted: true };
  }
}
