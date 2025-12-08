import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
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
import { Router } from '@angular/router';
import { AuthHeader } from '../../../components/auth-header/auth-header';
import { UserLoginRequestDTO } from '../../../models/dtos/user.dto.models';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { catchError, EMPTY, forkJoin, switchMap } from 'rxjs';
import { UserModel } from '../../../models/entities/user.models';
import { RoleType } from '../../../models/enums/role.enum';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    AuthHeader,
    ToastrModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  isLoading = signal<boolean>(false);
  loginForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly toastr: ToastrService
  ) {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });

    if (localStorage.getItem('zen_accessToken')) {
      const role = JSON.parse(localStorage.getItem('zen_userInfo')!).role;
      this.navigateToModule(role);
    }
  }

  login(): void {
    this.isLoading.set(true);
    const request: UserLoginRequestDTO = {
      email: this.loginForm.get('email')?.value,
      password: this.loginForm.get('password')?.value,
    };
    this.authService
      .login(request)
      .pipe(
        catchError(async (err) => {
          this.toastr.error('Error, revisa los datos introducidos.');
          this.isLoading.set(false);
        }),
        switchMap((res) => {
          if (res) {
            console.log('res', res);
            let t = new Date(res.accessTokenExpiresAt);
            localStorage.setItem('zen_accessToken', res.accessToken);
            localStorage.setItem('zen_refreshToken', res.refreshToken);
            localStorage.setItem('zen_expireDate', t.toString());
            return this.usersService.get(res.userId);
          }
          return EMPTY;
        })
      )
      .subscribe((user: UserModel) => {
        this.isLoading.set(false);
        this.usersService.setUser(user);
        this.navigateToModule(user.role);
      });
  }

  navigateToModule(role: number): void {
    if (role === RoleType.BUSINESS) {
      void this.router.navigate(['/admin/profile']);
    } else {
      void this.router.navigate(['/public/home']);
    }
  }

  goToRegister(): void {
    void this.router.navigate(['/register']);
  }
}
