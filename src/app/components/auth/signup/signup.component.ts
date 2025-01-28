// signup.component.ts
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormLoginComponent } from "../form/form.component";
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { Student } from '../../../model/student-list.model';
import { StudentListService } from '../../../services/student-list.services';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    RouterModule,
    FormLoginComponent,
    MatStepperModule
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  @ViewChild('stepper') stepper!: MatStepper;
  accountForm!: FormGroup;
  registrationForm!: FormGroup;
  currentStep = 1;
  hidePassword = true;
  studentId:string|null=null
  student?:Student

  constructor(private fb: FormBuilder,private route:ActivatedRoute,private studentService:StudentListService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.route.paramMap.subscribe(params => {
      this.studentId= params.get('id');}
    )
    if(!this.studentId){
    this.accountForm = this.fb.group({
      // Add your account form controls here
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });

    this.registrationForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      grade: ['', [Validators.required, Validators.min(0)]],
      subjects: this.fb.group({
        subject1: ['', [Validators.required, Validators.min(0)]],
        subject2: ['', [Validators.required, Validators.min(0)]],
        subject3: ['', [Validators.required, Validators.min(0)]],
        subject4: ['', [Validators.required, Validators.min(0)]]
      })
    });
  }
  else{
    this.student=this.studentService.getStudentById(Number(this.studentId))
    this.accountForm = this.fb.group({
      // Add your account form controls here
      username: [this.student?.username, [Validators.required]],
      password: [this.student?.password, Validators.required]
    });

    this.registrationForm = this.fb.group({
      name: [this.student?.name, Validators.required],
      age: [this.student?.age, [Validators.required, Validators.min(0)]],
      grade: [this.student?.class, [Validators.required, Validators.min(0)]],
      subjects: this.fb.group({
        subject1: [this.student?.marks.english, [Validators.required, Validators.min(0)]],
        subject2: [this.student?.marks.math, [Validators.required, Validators.min(0)]],
        subject3: [this.student?.marks.science, [Validators.required, Validators.min(0)]],
        subject4: ['', [Validators.required, Validators.min(0)]]
      })
    });
  }
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  usernameErrorMessage(): string {
    const username = this.registrationForm?.get('username');
    if (username?.hasError('required')) {
      return 'Username is required';
    }
    if (username?.hasError('email')) {
      return 'Please enter a valid email';
    }
    return '';
  }

  passwordErrorMessage(): string {
    const password = this.registrationForm?.get('password');
    if (password?.hasError('required')) {
      return 'Password is required';
    }
    if (password?.hasError('minlength')) {
      return 'Password must be at least 8 characters';
    }
    return '';
  }
  commonErrorMessage():string{
    return 'This is a required field'
  }

  nextStep() {
    if (this.currentStep === 1 &&
      this.registrationForm.get('username')?.valid &&
      this.registrationForm.get('password')?.valid) {
      this.currentStep = 2;
    }
  }

  onSubmit() {
    if (this.currentStep === 1) {
      this.nextStep();
    } else if (this.currentStep === 2 && this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      // Implement registration logic here
    }
  }

  handleSubmit(form: FormGroup) {
    if (form.valid) {
      console.log(form.value);
      this.stepper.next();
    }
  }
  onFinalSubmit() {
    if (this.registrationForm.valid && this.accountForm.valid) {
      // Combine both forms' data
      const finalData = {
        ...this.accountForm.value,
        ...this.registrationForm.value
      };
      console.log('Final submission', finalData);
      // Handle your submission logic here
    }
  }
}