import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { UiPageHeader } from '../../../../components/ui-page-header/ui-page-header';
import { UISelectModel } from '../../../../models/basic/ui-select.model';
import { UsersService } from '../../../../services/users.service';
import { ProvincesService } from '../../../../services/provinces.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UserModel } from '../../../../models/entities/user.models';
import { UserUpdateRequestDTO } from '../../../../models/dtos/user.dto.models';
import { catchError, EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-public-profile',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    UiPageHeader,
    ToastrModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class PublicProfile implements AfterViewInit {
  isLoading = signal(false);
  profileForm: FormGroup;

  user!: UserModel;
  provinceOptions: UISelectModel[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly usersService: UsersService,
    private readonly provincesService: ProvincesService,
    private readonly toastr: ToastrService
  ) {
    this.profileForm = this.fb.group({
      id: [null],
      firstName: [null, [Validators.required]],
      lastName: [null],
      // email: [null, [Validators.required, Validators.email]],
      phone: [null],
      provinceId: [null, [Validators.required]],
    });

    this.usersService.user$.subscribe((user) => {
      this.user = user!;
    });
  }
  
  ngAfterViewInit(): void {
    this.loadSelectValues();
    this.loadData();
  }

  loadSelectValues(): void {
    this.provincesService.getSelectOptions().subscribe((response) => {
      this.provinceOptions = response;
    });
  }

  loadData(): void {
    this.isLoading.set(true);
    
    this.usersService.get(this.user.id).subscribe((user) => {
      this.user = user!;
      this.usersService.setUser(this.user);
      this.profileForm.get('id')?.setValue(this.user.id);
      this.profileForm.get('firstName')?.setValue(this.user.firstName);
      this.profileForm.get('lastName')?.setValue(this.user.lastName);
      // this.profileForm.get('email')?.setValue(this.user.email);
      this.profileForm.get('phone')?.setValue(this.user.phone);
      this.profileForm.get('provinceId')?.setValue(this.user.provinceId);
      this.isLoading.set(false);
    })
  }

  save(): void {
    this.isLoading.set(true);
    const request: UserUpdateRequestDTO = {
      id: this.profileForm.get('id')?.value,
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
      phone: this.profileForm.get('phone')?.value,
      provinceId: this.profileForm.get('provinceId')?.value,
    };
    this.usersService.update(request).pipe(
      catchError(() => {
        this.isLoading.set(false);
        this.toastr.error('Error updating profile');
        return EMPTY;
      })
    ).subscribe(() => {
      this.toastr.success('Profile updated successfully', 'Success');
      this.loadData();
      this.isLoading.set(false);
    })
  }
}
