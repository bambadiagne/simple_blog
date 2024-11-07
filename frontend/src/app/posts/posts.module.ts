import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './new-post/new-post.component';
import { PostRoutingModule } from './post-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PostListComponent } from './post-list/post-list.component';
import { PostCardComponent } from './post-card/post-card.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostEditComponent } from './post-edit/post-edit.component';
import { PostListingComponent } from './post-listing/post-listing.component';
import { UserPostsComponent } from './my-posts/my-posts.component';
import { CommentsModule } from '../comments/comments.module';

@NgModule({
  declarations: [NewPostComponent, PostListComponent, PostCardComponent, PostDetailComponent, PostEditComponent, PostListingComponent, UserPostsComponent],
  exports: [PostCardComponent],
  imports: [CommonModule, SharedModule, PostRoutingModule, CommentsModule]
})
export class PostsModule {}
