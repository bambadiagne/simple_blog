import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comment } from '../models/comment';
@Injectable({
  providedIn: 'root'
})
export class CommentsService {
  endpoint = environment.apiUrl;

  constructor(private http: HttpClient) {}
  createComment(comment: Comment) {
    return this.http.post<Comment>(`${this.endpoint}/comments`, comment);
  }
  deleteComment(id: number) {
    return this.http.delete<Comment>(`${this.endpoint}/comments/${id}`);
  }
}
