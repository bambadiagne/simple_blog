import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { Post } from 'src/app/posts/models/post';
import { PostsService } from 'src/app/posts/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, OnDestroy {
  loading = true;
  private intervalId: any;
  private textList = ['Welcome to our site', 'We are happy to see you here', 'We hope you enjoy your stay'];
  private _destroy = new Subject<void>();
  posts: Post[];
  currentText = this.textList[0];
  constructor(private _postsService: PostsService) {}

  ngOnInit(): void {
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
          console.log(posts);
          this.posts = posts;
        },
        error: (error) => {
          console.log(error);
        }
      });
    this.loading = false;
  }

  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
    if (this.intervalId) {
      clearInterval(this.intervalId);
      console.log('Interval cleared');
    }
  }
}
