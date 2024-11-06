import { Component, OnDestroy, OnInit } from '@angular/core';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { Post } from '../models/post';
import { Subject, takeUntil } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-my-posts',
  templateUrl: './my-posts.component.html',
  styleUrl: './my-posts.component.css'
})
export class UserPostsComponent implements OnInit, OnDestroy {
  loading = false;
  posts: ApiResponse<Post>;
  $destroy = new Subject<void>();
  constructor(
    private postsService: PostsService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {
    this.getPosts();
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
  onPageChange(event: any) {
    this.getPosts({ page: event.page + 1 });
  }

  getPosts(query?: any) {
    this.postsService
      .getUserPosts(localStorage.getItem('userId'), query)
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (posts) => {
          this.posts = posts;
          this.loading = false;
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            key: 'tc',
            summary: 'Error',
            detail: 'Error while loading posts. Please try again later.',
            life: 3000
          });

          this.loading = false;
        }
      });
  }
  deletePostCard(id: number) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this post?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      acceptIcon: 'none',
      rejectIcon: 'none',
      accept: () => {
        this.delete(id);
      }
    });
  }
  delete(id: number) {
    this.loading = true;

    this.postsService
      .deletePost(id)
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            key: 'tc',
            summary: 'Success',
            detail: 'Post deleted successfully',
            life: 3000
          });
          this.loading = false;

          this.posts.data = this.posts.data.filter((post) => post.id !== id);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            key: 'tc',
            summary: 'Error',
            detail: 'Error while deleting post. Please try again later.',
            life: 3000
          });
        }
      });
  }
}
