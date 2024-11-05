import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserCreationPayload, UserLoginPayload } from 'src/app/auth/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  $currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  endpoint = environment.apiUrl;
  constructor(private http: HttpClient) {}
  createUser(user: UserCreationPayload) {
    return this.http.post(`${this.endpoint}/users`, user);
  }
  login(user: UserLoginPayload) {
    return this.http
      .post(`${this.endpoint}/auth/login`, user, {
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
    return this.http.get(`${this.endpoint}/users/me`).pipe(
      tap({
        next: (response) => {
          this.$currentUser.next(response);
          return response;
        }
      })
    );
  }
  refreshToken() {
    return this.http.post(
      `${this.endpoint}/auth/refresh`,
      {},
      {
        withCredentials: true
      }
    );
  }
  logout() {
    return this.http
      .post(
        `${this.endpoint}/auth/logout`,
        {},
        {
          withCredentials: true
        }
      )
      .pipe(
        tap({
          next: (response) => {
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
