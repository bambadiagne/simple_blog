import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../models/post';
import { Router } from '@angular/router';
import { UserResponse } from 'src/app/auth/models/user';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrl: './post-card.component.css'
})
export class PostCardComponent implements OnInit {
  @Input() post: Post;
  @Input() canBeDeleted: boolean = false;
  @Input() canBeEdited: boolean = false;
  @Output() deletePost = new EventEmitter<Post>();
  @Output() editPost = new EventEmitter<Post>();
  constructor(private router: Router) {}
  ngOnInit(): void {}
}
