import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, signal } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { UISelectModel } from '../../../../models/basic/ui-select.model';
import { UiCategoryFull } from '../../../../components/ui-category-full/ui-category-full';
import { ConfigureAvailabilityModal } from '../modals/configure-availability-modal/configure-availability-modal';
import { AddCategoryModal } from '../modals/add-category-modal/add-category-modal';
import { UsersService } from '../../../../services/users.service';
import { BusinessesService } from '../../../../services/businesses.service';
import { UserModel } from '../../../../models/entities/user.models';
import { catchError, EMPTY, forkJoin, Observable, switchMap } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BusinessGetSingleResponseDTO, BusinessUpdateRequestDTO } from '../../../../models/dtos/business.dto.models';
import { ProvincesService } from '../../../../services/provinces.service';
import { UserUpdateRequestDTO } from '../../../../models/dtos/user.dto.models';
import { CategoriesService } from '../../../../services/categories.service';
import { AvailabilityModel } from '../../../../models/entities/availability.models';
import { AvailabilityUpdateSingleDTO } from '../../../../models/dtos/availability.dto.models';
import { AvailabilitiesService } from '../../../../services/availabilities.service';

@Component({
  selector: 'app-admin-profile',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    UiCategoryFull,
    ToastrModule,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class AdminProfile implements AfterViewInit {
  isLoading = signal(false);
  profileForm: FormGroup;
  categories: FormArray;
  availabilities: AvailabilityModel[] = [];
  provinceOptions: UISelectModel[] = [];
  categoryOptions: UISelectModel[] = [];

  user!: UserModel;

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog,
    private readonly usersService: UsersService,
    private readonly businessesService: BusinessesService,
    private readonly provincesService: ProvincesService,
    private readonly categoriesService: CategoriesService,
    private readonly availabilitiesService: AvailabilitiesService,
    private readonly toastr: ToastrService,
  ) {
    this.profileForm = this.fb.group({
      id: [null],
      photo: [null],
      businessId: [null],
      businessName: [null, [Validators.required]],
      provinceId: [null, [Validators.required]],
      address: [null, [Validators.required]],
      simultaneousBookings: [null, [Validators.required]],
      description: [null],
      keyword1: [null],
      keyword2: [null],
      keyword3: [null],
      firstName: [null], // User
      lastName: [null], // User
      email: [null], // User
      phone: [null, [Validators.required]],
      instagramUser: [null],
      xUser: [null],
      tikTokUser: [null],
      facebookUser: [null],
      googleMaps: [null],
      categories: this.fb.array([]),
    });

    this.categories = this.profileForm.get('categories') as FormArray;

    this.usersService.user$.subscribe(user => this.user = user!);
  }

  ngAfterViewInit(): void {
    this.loadSelectValues();
    this.loadData();
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

  loadData(): void {
    this.isLoading.set(true);

    this.businessesService.get(this.user.businessId!).pipe(
      catchError(() => {
        this.isLoading.set(false);
        this.toastr.error('Error while getting the business information.');
        return EMPTY;
      })
    ).subscribe((business: BusinessGetSingleResponseDTO) => {
      this.isLoading.set(false);
      this.profileForm.get('id')?.setValue(this.user.id);
      this.profileForm.get('businessId')?.setValue(this.user.businessId);
      this.profileForm.get('firstName')?.setValue(this.user.firstName);
      this.profileForm.get('lastName')?.setValue(this.user.lastName);
      this.profileForm.get('email')?.setValue(this.user.email);
      this.profileForm.get('phone')?.setValue(this.user.phone);

      this.profileForm.get('businessName')?.setValue(business.name);
      this.profileForm.get('photo')?.setValue(business.photo);
      this.profileForm.get('provinceId')?.setValue(business.provinceId);
      this.profileForm.get('address')?.setValue(business.address);
      this.profileForm.get('simultaneousBookings')?.setValue(business.simultaneousBookings);
      this.profileForm.get('description')?.setValue(business.description);
      this.profileForm.get('keyword1')?.setValue(business.keyword1);
      this.profileForm.get('keyword2')?.setValue(business.keyword2);
      this.profileForm.get('keyword3')?.setValue(business.keyword3);
      this.profileForm.get('instagramUser')?.setValue(business.instagramUser);
      this.profileForm.get('xUser')?.setValue(business.xUser);
      this.profileForm.get('tikTokUser')?.setValue(business.tikTokUser);
      this.profileForm.get('facebookUser')?.setValue(business.facebookUser);
      this.profileForm.get('googleMaps')?.setValue(business.googleMaps);

      this.categories.clear();
      business.categories.forEach((category) => {
        this.categories.push(this.fb.group({
          id: [category.id],
          name: [category.name],
        }));
      });

      this.availabilities = business.availabilities;
    });
  }

  save(): void {
    this.isLoading.set(true);
    const businessRequest: BusinessUpdateRequestDTO = {
      id: this.profileForm.get('businessId')?.value,
      name: this.profileForm.get('businessName')?.value,
      description: this.profileForm.get('description')?.value,
      address: this.profileForm.get('address')?.value,
      photo: this.profileForm.get('photo')?.value,
      keyword1: this.profileForm.get('keyword1')?.value,
      keyword2: this.profileForm.get('keyword2')?.value,
      keyword3: this.profileForm.get('keyword3')?.value,
      phone: this.profileForm.get('phone')?.value,
      simultaneousBookings: +this.profileForm.get('simultaneousBookings')?.value,
      instagramUser: this.profileForm.get('instagramUser')?.value,
      xUser: this.profileForm.get('xUser')?.value,
      tikTokUser: this.profileForm.get('tikTokUser')?.value,
      facebookUser: this.profileForm.get('facebookUser')?.value,
      googleMaps: this.profileForm.get('googleMaps')?.value,
      provinceId: this.profileForm.get('provinceId')?.value,
      isActive: true,
      // userId: this.profileForm.get('id')?.value
    };
    const userRequest: UserUpdateRequestDTO = {
      id: this.profileForm.get('id')?.value,
      firstName: this.profileForm.get('firstName')?.value,
      lastName: this.profileForm.get('lastName')?.value,
      // email: this.profileForm.get('email')?.value,
      phone: this.profileForm.get('phone')?.value,
      provinceId: this.profileForm.get('provinceId')?.value,
    };

    
    forkJoin({
      business: this.businessesService.update(businessRequest),
      user: this.usersService.update(userRequest),
    }).pipe(
      catchError(() => {
        this.isLoading.set(false);
        this.toastr.error('Error while updating the business and user information.');
        return EMPTY;
      })
    ).subscribe(() => {
      this.isLoading.set(false);
      this.loadData();
    });
  }

  goTo(path: string): void {
    void this.router.navigate([path]);
  }

  openAvailabilityModal(): void {
    const dialogRef = this.dialog.open(ConfigureAvailabilityModal, {
      data: {
        availabilities: this.availabilities,
        businessId: this.user.businessId!,
      },
      minWidth: '80vw',
      maxWidth: '80vw',
    });

    dialogRef.afterClosed().pipe().subscribe(() => {
      this.loadData();
    });
  }

  openAddCategoryModal(): void {
    const dialogRef = this.dialog.open(AddCategoryModal, {
      data: {
        categories: this.filterUnusedCategories(this.categoryOptions),
        businessId: this.profileForm.get('businessId')?.value,
      },
      minWidth: '400px',
      maxWidth: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  filterUnusedCategories(categoryOptions: UISelectModel[]): UISelectModel[] {
    return categoryOptions.filter((category) => !this.categories.controls.map((c) => c.get('id')?.value).includes(category.value));
  }
}
