import { FormGroup, Validators } from '@angular/forms';
import { CustomFormControl } from 'src/app/shared/forms/custom-control';
import { FormBase } from 'src/app/shared/forms/form-base';

export class UserLoginForm extends FormBase {
  public emailFormControl: CustomFormControl;
  public passwordFormControl: CustomFormControl;
  public constructor() {
    super();
    this.emailFormControl = new CustomFormControl<string>('', [Validators.required, Validators.email], 'email', 'email');
    this.passwordFormControl = new CustomFormControl<Date>(null, [Validators.required], 'password', 'password');
    this.form = new FormGroup({
      email: this.emailFormControl,
      password: this.passwordFormControl
    });
  }
}