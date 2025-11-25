import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
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
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class AdminProfile {
  isLoading = signal(true);
  profileForm: FormGroup;
  categories: FormArray;
  provinceOptions: UISelectModel[] = [];

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly dialog: MatDialog
  ) {
    this.loadData();

    this.profileForm = this.fb.group({
      id: [null],
      photo: [null],
      businessName: [null, [Validators.required]],
      provinceId: [null, [Validators.required]],
      address: [null, [Validators.required]],
      simultaneousReservations: [null, [Validators.required]],
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
  }

  loadData(): void {
    // TODO Implement loadData method.
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  save(): void {
    // TODO Implement save method.
  }

  goTo(path: string): void {
    void this.router.navigate([path]);
  }

  openAvailabilityModal(): void {
    const dialogRef = this.dialog.open(ConfigureAvailabilityModal, {
      minWidth: '80vw',
      maxWidth: '80vw',
    });
  }

  openAddCategoryModal(): void {
    const dialogRef = this.dialog.open(AddCategoryModal, {
      minWidth: '400px',
      maxWidth: '400px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }
}
