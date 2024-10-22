import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserCreationPayload } from 'src/app/auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private http: HttpClient) {}
  createUser(user: UserCreationPayload) {
    return this.http.post('http://localhost:3000/users', user);
  }
}
