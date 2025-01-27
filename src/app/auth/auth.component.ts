import { Component, Input } from '@angular/core';
import { ReactiveFormsModule, FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormLoginComponent } from "./form/form.component";

@Component({
  selector: 'app-form-auth',
  imports: [MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,RouterOutlet],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
loginForm: FormGroup;
  hidePassword:boolean=true;
  @Input() firstFieldLabel: string = 'Username';
  @Input() secondFieldLabel: string = 'Password';
  @Input() submitButtonText: string = 'Login';
  @Input() linkText: string = 'Don\'t have an account? ';
  @Input() linkRoute: string = '/signup';
  @Input() nextRouteName:string="Signup"

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
          ),
        ],
      ],
    });
  }

  usernameErrorMessage(): string {
    const username = this.loginForm.get('username');
    if (username?.invalid && (username?.dirty || username?.touched)) {
      if (username?.hasError('required')) {
        return 'Username is required';
      }
    }
    return '';
  }

  passwordErrorMessage(): string {
    const password = this.loginForm.get('password');
    if (password?.invalid && (password?.dirty || password?.touched)) {
      if (password?.hasError('required')) {
        return 'Password is required';
      }
      if (password?.hasError('minlength')) {
        return 'Password must be at least 8 characters long';
      }
      if (password?.hasError('pattern')) {
        return 'Password must include uppercase, lowercase, number, and special character';
      }
    }
    return '';
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        control?.markAsTouched();
      });
      console.log('Form is invalid');
    }
  }

  onCancel(): void {
    this.loginForm.reset();
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.setErrors(null);
      control?.markAsUntouched();
      // control?.markAsPristine();
    });
  }
  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }
}
