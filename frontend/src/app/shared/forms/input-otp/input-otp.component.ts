import { Component, EventEmitter, Output } from '@angular/core';
import { FormBaseComponent } from '../formulaire-base';

@Component({
  selector: 'app-input-otp',
  templateUrl: './input-otp.component.html',
  styleUrl: './input-otp.component.css'
})
export class InputOtpComponent extends FormBaseComponent {
  @Output() resendOtp = new EventEmitter<void>();
  @Output() submitOtp = new EventEmitter<string>();
  constructor() {
    super();
  }
  onResendOtp() {
    this.resendOtp.emit();
  }
  onSubmitOtp() {
    this.submitOtp.emit(this.form.value);
  }
}
