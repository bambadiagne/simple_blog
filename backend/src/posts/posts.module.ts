import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [DatabaseModule, CommonModule],
  exports: [PostsService],
})
export class PostsModule {}
