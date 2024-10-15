import { FormGroup } from '@angular/forms';

import { CustomFormControl } from './custom-control';
import { ListeFunctionalMessage } from '../models/message-fonctionnel';

export class FormBase {
  public form: FormGroup;
  public messages: ListeFunctionalMessage = new ListeFunctionalMessage();

  public valider(): boolean {
    this.messages = new ListeFunctionalMessage();

    for (const typeCritere of Object.keys(this.form.controls)) {
      const control = this.form.controls[typeCritere] as CustomFormControl;
      if (control && control.generateMessage()) {
        this.messages.addMessage(control.generateMessage());
        control.isFormChecked = true;
      }
    }
    return this.messages.length === 0;
  }
}
