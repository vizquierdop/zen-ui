import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AuthHeader } from '../../../components/auth-header/auth-header';
import { MatStepperModule, StepperOrientation } from '@angular/material/stepper';
import { Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { UISelectModel } from '../../../models/basic/ui-select.model';
import { catchError, EMPTY, forkJoin, Observable } from 'rxjs';
import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { UsersService } from '../../../services/users.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserCreateRequestDTO } from '../../../models/dtos/user.dto.models';
import { RoleType } from '../../../models/enums/role.enum';
import { CategoriesService } from '../../../services/categories.service';
import { ProvincesService } from '../../../services/provinces.service';

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
    MatSelectModule,
    ToastrModule,
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

  breakpoint$: Observable<BreakpointState>;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private breakpointObserver: BreakpointObserver,
    private readonly usersService: UsersService,
    private readonly toastr: ToastrService,
    private readonly categoriesService: CategoriesService,
    private readonly provincesService: ProvincesService
  ) {
    this.registerForm = this.fb.group({
      // Basic Info
      name: [null, [Validators.required]],
      surname: [null, [Validators.required]],
      provinceId: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      // confirmPassword: [null, [Validators.required]],
      phone: [null],
      //Business Info
      businessName: [null],
      categories: [[]],
      keyword1: [null],
      keyword2: [null],
      keyword3: [null],
    });

    this.breakpoint$ = this.breakpointObserver.observe(['(max-width: 752px)']);

    this.breakpoint$.subscribe((result) => {
      this.breakpointChanges();
    });

    this.loadSelectValues();

    effect(() => {
      const isBusiness = this.userType() === 'business';
      const fieldsToCheck = ['businessName', 'keyword1', 'keyword2', 'keyword3'];

      fieldsToCheck.forEach((fieldName) => {
        const control = this.registerForm.get(fieldName);
        if (control) {
          if (isBusiness) {
            control.setValidators([Validators.required]);
          } else {
            control.clearValidators();
          }
          control.updateValueAndValidity();
        }
      });
      this.registerForm.updateValueAndValidity();
    });
  }

  loadSelectValues(): void {
    forkJoin({
      provinces: this.provincesService.getSelectOptions(),
      categories: this.categoriesService.getSelectOptions(),
    }).subscribe(({ provinces, categories }) => {
      this.provinceOptions = provinces;
      this.categoryOptions = categories;
    });
  }

  breakpointChanges(): void {
    if (this.breakpointObserver.isMatched('(max-width: 752px)')) {
      this.stepperOrientation = 'vertical';
    } else {
      this.stepperOrientation = 'horizontal';
    }
  }

  register(): void {
    const password = this.registerForm.get('password')?.value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z\d]).{8,}$/;

    if (!password || !passwordRegex.test(password)) {
      this.toastr.error(
        'Password must be at least 8 characters and contain 3 types of characters (number, uppercase, lowercase, special).'
      );
      return;
    }

    if (
      this.userType() === 'business' &&
      (this.registerForm.get('categories')?.value === null ||
        this.registerForm.get('categories')?.value.length === 0)
    ) {
      this.toastr.error('Please select at least one category.');
      return;
    }

    this.isLoading.set(true);
    const request: UserCreateRequestDTO = {
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      firstName: this.registerForm.get('name')?.value,
      lastName: this.registerForm.get('surname')?.value,
      phone: this.registerForm.get('phone')?.value,
      role: this.userType() === 'business' ? RoleType.BUSINESS : RoleType.CUSTOMER,
      isActive: true,
      provinceId: this.registerForm.get('provinceId')?.value,
      business:
        this.userType() === 'business'
          ? {
              name: this.registerForm.get('businessName')?.value,
              categoryIds: this.registerForm.get('categories')?.value,
              keyword1: this.registerForm.get('keyword1')?.value,
              keyword2: this.registerForm.get('keyword2')?.value,
              keyword3: this.registerForm.get('keyword3')?.value,
              isActive: true,
              provinceId: this.registerForm.get('provinceId')?.value,
              address: '',
              simultaneousBookings: 1,
            }
          : undefined,
    };

    this.usersService
      .register(request)
      .pipe(
        catchError(() => {
          this.isLoading.set(false);
          this.toastr.error('Error registering user');
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.isLoading.set(false);
        this.toastr.success('User registered successfully');
        this.goToLogin();
      });
  }

  goToLogin(): void {
    void this.router.navigate(['/login']);
  }
}
