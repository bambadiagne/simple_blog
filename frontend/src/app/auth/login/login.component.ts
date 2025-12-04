import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ListeFunctionalMessage, MessageType } from 'src/app/shared/models/message-fonctionnel';
import { UsersService } from 'src/app/users/service/users.service';
import { UserLoginForm } from '../models/user-login.form';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnDestroy {
  loading = false;
  private _destroy$ = new Subject<void>();
  userLoginForm: UserLoginForm;
  messages: ListeFunctionalMessage = new ListeFunctionalMessage();
  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    this.userLoginForm = new UserLoginForm();
  }
  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
  submitForm() {
    if (this.userLoginForm.valider()) {
      this.loading = true;
      this.usersService
        .login(this.getUserPayload())
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: (res) => {
            this.loading = false;
            this.messages.addMessage({ type: MessageType.success, message: 'Login successful', fieldId: '' });
            this.router.navigate(['/']);
          },
          error: (error) => {
            this.messages.addMessage({ type: MessageType.error, message: error.error.message.message, fieldId: '' });
            this.loading = false;
          }
        });
    }
    this.messages.clear();
  }
  getUserPayload() {
    return {
      email: this.userLoginForm.emailFormControl.value,
      password: this.userLoginForm.passwordFormControl.value
    };
  }
  handleGoogleAuth(token: string) {
    this.usersService.loginWithGoogle(token).pipe(takeUntil(this._destroy$)).subscribe({
      next: () => {
        this.messages.addMessage({ type: MessageType.success, message: 'User logged in with Google', fieldId: '' });
        setTimeout(() => {
        this.router.navigate(['/']);}, 1000);
      },
      error: (error) => {
        this.messages.addMessage({ type: MessageType.error, message: error.error.message.message, fieldId: '' });
      }
    });
  }
}
