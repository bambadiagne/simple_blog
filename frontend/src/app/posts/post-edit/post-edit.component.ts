import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from '../models/post';
import { ListeFunctionalMessage, MessageType } from 'src/app/shared/models/message-fonctionnel';
import { Subject, takeUntil } from 'rxjs';
import { PostsService } from '../services/posts.service';
import { MessageService } from 'primeng/api';
import { CreatePostForm } from '../models/post.form';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.css'
})
export class PostEditComponent implements OnInit, OnDestroy {
  private post: Post;

  updatePostForm: CreatePostForm;
  loading = false;
  private _destroy = new Subject<void>();
  messages: ListeFunctionalMessage = new ListeFunctionalMessage();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private postsService: PostsService,
    private messageService: MessageService
  ) {
    this.post = this.route.snapshot.data as Post;
    this.updatePostForm = new CreatePostForm();
    this.updatePostForm.init(this.post);
  }
  ngOnDestroy(): void {
    this._destroy.next();
    this._destroy.complete();
  }
  ngOnInit() {}

  onUploadFile(event) {
    this.loading = true;
    const formData = new FormData();
    formData.append('image', event);
    this.postsService.updatePostImage(this.post.id, formData).subscribe({
      next: (response) => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Image uploaded successfully', life: 2000 });
      },
      error: (error) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message.message, life: 2000 });
      }
    });
    document.getElementById('post-edit').scrollIntoView({ behavior: 'smooth' });
  }
  updatePost() {
    if (this.updatePostForm.valider()) {
      this.loading = true;
      this.postsService
        .updatePost(this.post.id, this.getPayload())
        .pipe(takeUntil(this._destroy))
        .subscribe({
          next: (response) => {
            this.loading = false;
            this.updatePostForm.form.reset();
            this.messages.addMessage({ type: MessageType.success, message: 'Post updated successfully', fieldId: '' });
            setTimeout(() => {
              this.router.navigate(['/posts']);
            }, 3000);
          },
          error: (error) => {
            this.loading = false;
            this.messages.addMessage({ type: MessageType.error, message: error.error.message.message, fieldId: '' });
          }
        });
      this.messages.clear();
      document.getElementById('post-edit').scrollIntoView({ behavior: 'smooth' });
    }
  }

  getPayload() {
    return {
      title: this.updatePostForm.form.value.title,
      content: this.updatePostForm.form.value.content
    };
  }
}
