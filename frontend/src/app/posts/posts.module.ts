import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './new-post/new-post.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostCardComponent } from './post-card/post-card.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostEditComponent } from './post-edit/post-edit.component';

@NgModule({
  declarations: [NewPostComponent, PostListComponent, PostCardComponent, PostDetailComponent, PostEditComponent],
  exports: [PostCardComponent],
  imports: [CommonModule, SharedModule, PostRoutingModule]
})
export class PostsModule {}
