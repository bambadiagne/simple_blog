import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit, OnDestroy {
  loading = true;
  post: Post;
  content: SafeHtml;
  private _destroy = new Subject<void>();
  constructor(
    private postsService: PostsService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) {}
  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.postsService
        .getPostDetail(params['id'])
        .pipe(takeUntil(this._destroy))
        .subscribe((post) => {
          this.post = post;
          this.content = this.domSanitizer.bypassSecurityTrustHtml(post.content);
          this.loading = false;
        });
    });
  }
  scrollToComments() {
    document.getElementById('comments-section').scrollIntoView({ behavior: 'smooth' });
  }
  public readingTime(txt) {
    const wpm = 225;
    const words = txt.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);

    return `${time} min read`;
  }
}
