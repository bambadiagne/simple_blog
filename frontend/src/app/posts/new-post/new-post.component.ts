import { Component, OnDestroy, OnInit } from '@angular/core';
import { CreatePostForm } from '../models/post.form';
import { Subject, takeUntil } from 'rxjs';
import { ListeFunctionalMessage, MessageType } from 'src/app/shared/models/message-fonctionnel';
import { PostsService } from '../services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent implements OnInit, OnDestroy {
  createPostForm: CreatePostForm;
  private _destroy = new Subject<void>();
  loading = false;
  messages: ListeFunctionalMessage = new ListeFunctionalMessage();

  constructor(
    private _postsService: PostsService,
    private router: Router
  ) {
    this.createPostForm = new CreatePostForm();
  }
  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }

  ngOnInit(): void {}
  onUploadFile(event) {
    this.createPostForm.form.patchValue({ image: event });
  }
  createPost() {
    if (!this.createPostForm.form.value.image) {
      this.messages.addMessage({ type: MessageType.error, message: 'Please upload an image', fieldId: 'image' });
      return;
    }
    if (this.createPostForm.valider()) {
      this.loading = true;

      this._postsService
        .createPost(this.getPayload())
        .pipe(takeUntil(this._destroy))
        .subscribe({
          next: (response) => {
            this.loading = false;
            this.createPostForm.form.reset();
            this.messages.addMessage({ type: MessageType.success, message: 'Post created successfully', fieldId: '' });
            setTimeout(() => {
              this.router.navigate(['/posts']);
            }, 1000);
          },
          error: (error) => {
            this.loading = false;
            this.messages.addMessage({ type: MessageType.error, message: error.error.message.message, fieldId: '' });
          }
        });
      this.messages.clear();
    }
  }
  getPayload() {
    const payload = new FormData();
    payload.append('title', this.createPostForm.form.value.title);
    payload.append('content', this.createPostForm.form.value.content);
    payload.append('image', this.createPostForm.form.value.image);
    return payload;
  }
}
