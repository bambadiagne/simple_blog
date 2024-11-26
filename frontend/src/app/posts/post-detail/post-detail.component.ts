import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PostsService } from '../services/posts.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../models/post';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NewCommentForm } from 'src/app/comments/models/new-comment.form';
import { CommentsService } from 'src/app/comments/services/comments.service';
import { MessageService } from 'primeng/api';
import { UsersService } from 'src/app/users/service/users.service';
import { User } from 'src/app/auth/models/user';
import { Comment } from 'src/app/comments/models/comment';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrl: './post-detail.component.css'
})
export class PostDetailComponent implements OnInit, OnDestroy {
  @ViewChild('commentsSection') commentsSection: ElementRef;
  loading = true;
  post: Post;
  showComments = false;
  content: SafeHtml;
  user: User;
  newCommentForm: NewCommentForm;
  private _destroy = new Subject<void>();
  constructor(
    private postsService: PostsService,
    private commentsService: CommentsService,
    private messageService: MessageService,
    private userService: UsersService,
    private route: ActivatedRoute,
    private domSanitizer: DomSanitizer
  ) {
    this.newCommentForm = new NewCommentForm();
  }
  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
  ngOnInit(): void {
    this.userService.$currentUser.pipe(takeUntil(this._destroy)).subscribe({
      next: (user) => {
        this.user = user;
      }
    });

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
    this.commentsSection.nativeElement.scrollIntoView({ behavior: 'smooth' });
  }
  public readingTime(txt) {
    const wpm = 225;
    const words = txt.trim().split(/\s+/).length;
    const time = Math.ceil(words / wpm);

    return `${time} min read`;
  }
  showDialog() {
    if (!this.user) {
      this.messageService.add({
        severity: 'error',
        key: 'tc',
        summary: 'Error',
        detail: 'You need to be logged in to comment',
        life: 2000
      });
    } else if (!this.user.is_verified) {
      this.messageService.add({
        severity: 'error',
        key: 'tc',
        summary: 'Error',
        detail: 'You need to verify your email before commenting',
        life: 2000
      });
    } else {
      this.showComments = !this.showComments;
    }
  }
  addComment() {
    if (this.newCommentForm.valider()) {
      this.loading = true;
      this.commentsService
        .createComment(this.getPayload())
        .pipe(takeUntil(this._destroy))
        .subscribe({
          next: (comment: Comment) => {
            this.messageService.add({
              severity: 'success',
              key: 'tc',
              summary: 'Success',
              detail: 'Comment added successfully'
            });
            this.commentsSection.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'end' });
            this.newCommentForm.commentFormControl.reset();
            this.showComments = false;
            this.post.comments.unshift({ ...comment, user: this.user });
            this.loading = false;
          },
          error: (error) => {
            console.log('error', error);

            this.loading = false;
            this.messageService.add({
              severity: 'error',
              key: 'tc',
              summary: 'Error',
              detail: error.error.message.message,
              life: 2000
            });
          }
        });
    }
    this.showComments = false;
  }
  onDeleteComment(id: number) {
    this.loading = true;
    this.commentsService
      .deleteComment(id)
      .pipe(takeUntil(this._destroy))
      .subscribe({
        next: (comment) => {
          this.loading = false;
          this.messageService.add({
            severity: 'success',
            key: 'tc',
            summary: 'Success',
            detail: 'Comment deleted successfully'
          });
          this.post.comments = this.post.comments.filter((c) => c.id !== id);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            key: 'tc',
            summary: 'Error',
            detail: 'An error occurred while deleting the comment',
            life: 2000
          });
        }
      });
  }
  getPayload() {
    return {
      content: this.newCommentForm.commentFormControl.value,
      post_id: this.post.id
    };
  }
  shareOnX() {
    window.open(`https://twitter.com/intent/tweet?text=${this.post.title}&url=${window.location.href}&hashtags=WaxSaXalaat`, '_blank');
  }
  shareOnLinkedin() {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`, '_blank');
  }
}
