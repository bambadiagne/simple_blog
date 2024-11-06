import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/posts/models/post';
import { PostsService } from 'src/app/posts/services/posts.service';
import { ApiResponse } from 'src/app/shared/models/api-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  loading = true;
  private intervalId: any;
  private textList = ['Welcome to our site', 'Join the community', 'Share your thoughts', 'Get inspired'];
  private _destroy = new Subject<void>();
  posts: ApiResponse<Post>;
  responsiveOptions: any[];
  currentText = this.textList[0];
  constructor(
    private _postsService: PostsService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1
      },
      {
        breakpoint: '991px',
        numVisible: 2,
        numScroll: 1
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1
      }
    ];
    this.intervalId = setInterval(() => {
      const currentIndex = this.textList.indexOf(this.currentText);
      if (currentIndex < this.textList.length - 1) {
        this.currentText = this.textList[currentIndex + 1];
      } else {
        this.currentText = this.textList[0];
      }
    }, 6000);
    this.loading = true;
    this._postsService
      .getPosts()
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
            detail: 'Error while loading posts. Please try again later.',
            life: 3000
          });

          this.loading = false;
        }
      });
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
    clearInterval(this.intervalId);
  }
}
