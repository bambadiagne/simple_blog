import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './new-post/new-post.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostCardComponent } from './post-card/post-card.component';

@NgModule({
  declarations: [NewPostComponent, PostListComponent, PostCardComponent],
  exports: [PostCardComponent],
  imports: [CommonModule, SharedModule, PostRoutingModule]
})
export class PostsModule {}
