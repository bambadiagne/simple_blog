import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';
import { ApiResponse } from 'src/app/shared/models/api-response';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  endpoint = environment.apiUrl;
  constructor(private http: HttpClient) {}
  createPost(post: FormData) {
    return this.http.post(`${this.endpoint}/posts`, post);
  }
  getPosts(query?: any): Observable<ApiResponse<Post>> {
    return this.http.get<ApiResponse<Post>>(`${this.endpoint}/posts`, { params: query });
  }
  getPostDetail(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.endpoint}/posts/${id}`);
  }
  getUserPosts(id: string, pagination?: any): Observable<ApiResponse<Post>> {
    return this.http.get<ApiResponse<Post>>(`${this.endpoint}/posts/user/${id}`, { params: pagination });
  }
  updatePost(id: number, post: any) {
    return this.http.patch(`${this.endpoint}/posts/${id}`, post);
  }
  updatePostImage(id: number, image: FormData) {
    return this.http.patch(`${this.endpoint}/posts/${id}/image`, image);
  }
  deletePost(id: number) {
    return this.http.delete(`${this.endpoint}/posts/${id}`);
  }
}
