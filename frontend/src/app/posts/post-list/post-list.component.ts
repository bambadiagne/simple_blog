import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';
import { Post } from '../models/post';
import { UsersService } from 'src/app/users/service/users.service';
import { UserResponse } from 'src/app/auth/models/user';
import { PostFilterForm } from '../models/post-filter.form';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit, OnDestroy {
  loading = false;
  searchForm: PostFilterForm;
  private _destroy = new Subject<void>();
  posts: Post[];
  constructor(
    private _postsService: PostsService,
    private router: Router
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
    this.getPosts(event);
  }

  getPosts(searchTerm?: string) {
    this.loading = true;

    this._postsService
      .getPosts(searchTerm)
      .pipe(takeUntil(this._destroy))
      .subscribe({
        next: (posts) => {
          console.log(posts);
          this.posts = posts;
        },
        error: (error) => {
          console.log(error);
        }
      });
    this.loading = false;
  }
}
