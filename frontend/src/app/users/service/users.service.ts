import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserCreationPayload, UserLoginPayload } from 'src/app/auth/models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  $currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  constructor(private http: HttpClient) {}
  createUser(user: UserCreationPayload) {
    return this.http.post('http://localhost:3000/users', user);
  }
  login(user: UserLoginPayload) {
    return this.http
      .post('http://localhost:3000/auth/login', user, {
        withCredentials: true
      })
      .pipe(
        tap({
          next: (response) => {
            localStorage.setItem('token', response['access_token']);
            this.getCurrentUser().subscribe();
          }
        })
      );
  }
  getCurrentUser() {
    return this.http.get('http://localhost:3000/users/me').pipe(
      tap({
        next: (response) => {
          this.$currentUser.next(response);
        }
      })
    );
  }
  refreshToken() {
    return this.http.post(
      'http://localhost:3000/auth/refresh',
      {},
      {
        withCredentials: true
      }
    );
  }
  logout() {
    return this.http
      .post(
        'http://localhost:3000/auth/logout',
        {},
        {
          withCredentials: true
        }
      )
      .pipe(
        tap({
          next: (response) => {
            console.log('remove token', response);

            localStorage.removeItem('token');
            this.$currentUser.next(null);
          }
        })
      );
  }
  isAuthenticated(): boolean {
    if (!localStorage.getItem('token')) {
      return false;
    }
    const token = localStorage.getItem('token').split('.')[1];
    const payload = JSON.parse(atob(token));
    const exp = payload.exp;

    return exp > new Date().getTime() / 1000;
  }
}
