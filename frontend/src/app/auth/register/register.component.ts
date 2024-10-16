import { Component } from '@angular/core';
import { CreateUserForm } from '../models/user.form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  createUserForm: CreateUserForm;
  constructor() {
    this.createUserForm = new CreateUserForm();
  }
  submitForm() {
    if (this.createUserForm.valider()) {
      console.log(this.createUserForm);
    }
  }
}
