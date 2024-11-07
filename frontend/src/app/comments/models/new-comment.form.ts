import { FormGroup, Validators } from '@angular/forms';
import { CustomFormControl } from 'src/app/shared/forms/custom-control';
import { FormBase } from 'src/app/shared/forms/form-base';

export class NewCommentForm extends FormBase {
  public commentFormControl: CustomFormControl;
  public constructor() {
    super();
    this.commentFormControl = new CustomFormControl<string>('', [Validators.required], 'comment', 'comment');
    this.form = new FormGroup({
      comment: this.commentFormControl
    });
  }
}
