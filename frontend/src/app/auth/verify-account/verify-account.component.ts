import { Component, OnDestroy, OnInit } from '@angular/core';
import { OtpForm } from '../models/otp.form';
import { Subject, takeUntil } from 'rxjs';
import { UsersService } from 'src/app/users/service/users.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-verify-account',
  templateUrl: './verify-account.component.html',
  styleUrl: './verify-account.component.css'
})
export class VerifyAccountComponent implements OnInit, OnDestroy {
  otpForm: OtpForm;
  private $destroy = new Subject<void>();
  constructor(
    private usersService: UsersService,
    private messageService: MessageService,
    private router: Router
  ) {
    this.otpForm = new OtpForm();
  }
  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }
  ngOnInit(): void {}
  resendOtp() {
    this.usersService
      .resend()
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            key: 'tc',
            summary: 'Success',
            detail: 'Otp sent successfully',
            life: 2000
          });
        },
        error: (error) => {
          console.log('error', error);

          this.messageService.add({
            severity: 'error',
            key: 'tc',
            summary: 'Error',
            detail: error.error.message.message,
            life: 2000
          });
        }
      });
  }
  onSubmitOtp(code: string) {
    this.usersService
      .verifyAccount(code)
      .pipe(takeUntil(this.$destroy))
      .subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            key: 'tc',
            summary: 'Success',
            detail: 'Account verified successfully'
          });
          setTimeout(() => {
            this.router.navigate(['/']);
          }, 1500);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            key: 'tc',
            summary: 'Error',
            detail: error.error.message.message
          });
        }
      });
  }
}
