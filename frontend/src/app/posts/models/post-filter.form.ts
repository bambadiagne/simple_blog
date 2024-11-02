import { FormGroup, Validators } from '@angular/forms';
import { CustomFormControl } from 'src/app/shared/forms/custom-control';
import { FormBase } from 'src/app/shared/forms/form-base';

export class PostFilterForm extends FormBase {
  public searchTermFormControl: CustomFormControl;
  public constructor() {
    super();
    this.searchTermFormControl = new CustomFormControl<string>('', [], 'searchTerm', 'searchTerm');
    this.form = new FormGroup({
      searchTerm: this.searchTermFormControl
    });
  }
}
