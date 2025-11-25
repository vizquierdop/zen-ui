import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthHeader } from '../../../components/auth-header/auth-header';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { MatSelectModule } from "@angular/material/select";
import { UISelectModel } from '../../../models/basic/ui-select.model';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    AuthHeader,
    MatStepperModule,
    MatSelectModule
],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  isLoading = signal<boolean>(false);
  userType = signal<'business' | 'customer'>('customer');
  stepperOrientation: StepperOrientation = 'horizontal';

  registerForm: FormGroup;
  provinceOptions: UISelectModel[] = [];
  categoryOptions: UISelectModel[] = [];

  constructor(private readonly fb: FormBuilder, private readonly router: Router) {
    this.registerForm = this.fb.group({
      // Basic Info
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      provinceId: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      //Business Info
      businessName: [null],
      categories: [[]],
      keyword1: [null],
      keyword2: [null],
      keyword3: [null],
    });
  }

  register(): void {
    // TODO Implement register call
  }
}
