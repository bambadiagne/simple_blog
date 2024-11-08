import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { Post } from '../models/post';
import { PostFilterForm } from '../models/post-filter.form';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy {
  loading = false;
  searchForm: PostFilterForm;
  private _destroy = new Subject<void>();
  posts: ApiResponse<Post>;
  constructor(
    private _postsService: PostsService,
    private messageService: MessageService
  ) {
    this.searchForm = new PostFilterForm();
  }
  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  ngOnInit(): void {
    this.getPosts();
  }

  filter(event: string) {
    this.getPosts({ searchTerm: event });
  }

  getPosts(query?: any) {
    this.loading = true;

    this._postsService
      .getPosts(query)
      .pipe(takeUntil(this._destroy))
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
            detail: error.error.message.message,
            life: 3000
          });

          this.loading = false;
        }
      });
  }
  onPageChange(event) {
    const query = { page: event.page };
    if (this.searchForm.form.value.searchTerm) {
      query['searchTerm'] = this.searchForm.form.value.searchTerm;
    }
    this.getPosts(query);
  }
}
