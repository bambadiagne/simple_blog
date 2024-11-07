import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBaseComponent } from '../formulaire-base';

@Component({
  selector: 'app-input-text',
  templateUrl: './input-text.component.html',
  styleUrl: './input-text.component.css'
})
export class InputTextComponent extends FormBaseComponent {
  @Input() icon = '';
  @Output() textChange = new EventEmitter<string>();
  constructor() {
    super();
  }
  public inputClass() {
    return this.form.messageError ? `${this.classes} is-invalid` : this.classes;
  }

  public descAttr() {
    return this.prependText || this.innerHtml ? `basic-addon1 ${this.idInput}-validity` : `${this.idInput}-validity`;
  }
  handleTextChange(event) {
    this.textChange.emit(event.target.value);
  }
}
