import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient) {}
  createPost(post: FormData) {
    return this.http.post('http://localhost:3000/posts', post);
  }
  getPosts(searchTerm?: string): Observable<Post[]> {
    return this.http.get<Post[]>('http://localhost:3000/posts', { params: searchTerm ? { searchTerm } : null });
  }
}
