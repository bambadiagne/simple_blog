import { Component, OnDestroy } from '@angular/core';
import { CreateUserForm } from '../models/user.form';
import { UsersService } from 'src/app/users/service/users.service';
import { UserRole } from '../models/user.role';
import { Router } from '@angular/router';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ListeFunctionalMessage, MessageType } from 'src/app/shared/models/message-fonctionnel';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy {
  loading = false;
  createUserForm: CreateUserForm;
  private _destroy$ = new Subject<void>();
  messages: ListeFunctionalMessage = new ListeFunctionalMessage();
  constructor(
    private usersService: UsersService,
    private router: Router
  ) {
    this.createUserForm = new CreateUserForm();
  }
  ngOnDestroy(): void {}
  submitForm() {
    if (this.createUserForm.valider()) {
      this.loading = true;
      this.usersService
        .createUser(this.getUserPayload())
        .pipe(takeUntil(this._destroy$))
        .subscribe({
          next: () => {
            this.loading = false;
            this.messages.addMessage({ type: MessageType.success, message: 'User created', fieldId: '' });
            this.router.navigate(['/login']);
          },
          error: (error) => {
            this.messages.addMessage({ type: MessageType.error, message: error.error.message.join('\n'), fieldId: '' });
            this.loading = false;
          }
        });
    }
    this.messages.clear();
  }
  getUserPayload() {
    return {
      username: this.createUserForm.usernameFormControl.value,
      email: this.createUserForm.emailFormControl.value,
      password: this.createUserForm.passwordFormControl.value,
      role: UserRole.USER
    };
  }
}
