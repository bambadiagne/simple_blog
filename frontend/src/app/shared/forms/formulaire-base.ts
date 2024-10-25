import { Input, Directive } from '@angular/core';
import { CustomFormControl } from './custom-control';

@Directive()
export class FormBaseComponent {
  @Input() public prependText = '';
  @Input() public appendText = '';
  @Input() public innerHtml!: string;
  @Input() public idInput!: string;
  @Input() public form!: CustomFormControl;
  @Input() public classes!: string;
  @Input() public label!: string;
  @Input() public modifiable = true;
  @Input() public noValidation = false;
  @Input() public listeAttributs!: { [key: string]: any };
  public constructor() {}
}
