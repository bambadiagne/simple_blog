import { Component, EventEmitter, Input, OnInit, Output, SecurityContext } from '@angular/core';
import { Comment } from '../models/comment';
import * as moment from 'moment';
@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrl: './comments-list.component.css'
})
export class CommentsListComponent implements OnInit {
  @Input() comments: Comment[];
  securityContext: SecurityContext = SecurityContext.HTML;
  currentUserId = parseInt(localStorage.getItem('userId'));
  @Output() emitDelete = new EventEmitter<number>();
  constructor() {}
  ngOnInit(): void {}

  getPassedTime(time: Date) {
    return moment(time).fromNow(true);
  }
  deleteComment(id: number) {
    this.emitDelete.emit(id);
  }
}
