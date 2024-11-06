import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../models/post';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit {
  @Input() post: Post;
  @Input() canBeDeleted: boolean = false;
  @Input() canBeEdited: boolean = false;
  @Output() cardDeletePost = new EventEmitter<number>();
  constructor(private router: Router) {}
  ngOnInit(): void {}
  emitDelete() {
    this.cardDeletePost.emit(this.post.id);
  }
  emitEdit() {
    this.router.navigate(['/posts/edit', this.post.id]);
  }
}
