import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Post } from '../models/post';
import { first } from 'rxjs';
import { ApiResponse } from 'src/app/shared/models/api-response';

@Component({
  selector: 'app-post-listing',
  templateUrl: './post-listing.component.html',
  styleUrl: './post-listing.component.css'
})
export class PostListingComponent {
  @Input() posts: ApiResponse<Post>;
  @Output() pageChange = new EventEmitter<any>();
  @Input() isUserPosts = false;
  @Output() deletePost = new EventEmitter<number>();

  @Input() paginationOptions = {
    first: 0,
    rows: 5
  };
  emitPageChange(event: any) {
    this.pageChange.emit({ page: event.page });
  }
  emitDelete(id: number) {
    this.deletePost.emit(id);
  }
}
