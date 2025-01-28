import { Component } from '@angular/core';
import { FormLoginComponent } from "../form/form.component";
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [ FormLoginComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  handleSubmit(form: FormGroup) {
    if (form.valid) {
      // Process form submission
      console.log(form.value);
    }
  }
}
