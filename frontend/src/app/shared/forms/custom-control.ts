import { FormControl, ValidatorFn } from '@angular/forms';

import { FunctionalMessage, MessageType } from '../models/message-fonctionnel';
import { FunctionalMessagePipe } from '../pipes/message.pipe';

export class CustomFormControl<TValue = any> extends FormControl<TValue> {
  public messageError?: FunctionalMessage;
  public isFormChecked = false;
  private _visible = true;

  constructor(
    protected originalValue: TValue,
    protected validators: ValidatorFn[],
    public fieldId: string,
    public fieldLabel: string
  ) {
    super(originalValue, { nonNullable: true, validators });
  }

  public get visible(): boolean {
    return this._visible;
  }

  public set visible(valeur: boolean) {
    this._visible = valeur;
    if (!valeur) {
      this.reset();
    }
  }

  public resetMessage(): void {
    this.messageError = undefined;
  }

  public generateMessage(): FunctionalMessage {
    if (this.errors && Object.keys(this.errors).length > 0) {
      const pipe = new FunctionalMessagePipe();
      const message = pipe.transform(Object.keys(this.errors)[0], this.fieldLabel, this.errors);
      this.messageError = new FunctionalMessage(message, MessageType.error, this.fieldId);
      this.isFormChecked = true;
      return this.messageError;
    }
    this.resetMessage();
    return this.messageError!;
  }

  public traduireMessage(): string {
    return this.messageError ? this.messageError.message : '';
  }
}
