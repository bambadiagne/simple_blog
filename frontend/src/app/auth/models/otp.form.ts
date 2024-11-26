import { FormGroup, Validators } from '@angular/forms';
import { CustomFormControl } from 'src/app/shared/forms/custom-control';
import { FormBase } from 'src/app/shared/forms/form-base';

export class OtpForm extends FormBase {
  public otpFormControl: CustomFormControl;
  public constructor() {
    super();
    this.otpFormControl = new CustomFormControl<string>('', [Validators.required, Validators.minLength(6), Validators.maxLength(6)], 'otp', 'otp');
    this.form = new FormGroup({
      otp: this.otpFormControl
    });
  }
}
