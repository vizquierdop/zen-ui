import { CommonModule } from '@angular/common';
import { Component, Inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { UISelectModel } from '../../../../../models/basic/ui-select.model';
import { UsersService } from '../../../../../services/users.service';
import { BusinessCategoriesService } from '../../../../../services/business-categories.service';
import { BusinessCategoryCreateRequestDTO } from '../../../../../models/dtos/business-category.dto.models';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-add-category-modal',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatFormFieldModule,
  ],
  templateUrl: './add-category-modal.html',
  styleUrl: './add-category-modal.scss',
})
export class AddCategoryModal {
  isLoading = signal(false);
  addCategoryForm: FormGroup;
  categoryOptions: UISelectModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      categories: UISelectModel[];
      businessId: number;
    },
    private readonly dialog: MatDialogRef<AddCategoryModal>,
    private readonly fb: FormBuilder,
    private readonly businessCategoriesService: BusinessCategoriesService
  ) {
    this.addCategoryForm = this.fb.group({
      businessId: [null, Validators.required],
      categoryId: [null, [Validators.required]],
    });
    this.categoryOptions = this.data.categories;
    this.addCategoryForm.get('businessId')?.setValue(this.data.businessId);
  }

  close(): void {
    this.dialog.close(null);
  }

  save(): void {
    const request: BusinessCategoryCreateRequestDTO = {
      businessId: this.addCategoryForm.get('businessId')?.value,
      categoryId: this.addCategoryForm.get('categoryId')?.value,
    }
    this.businessCategoriesService.create(request).pipe(
      catchError(() => {
        this.isLoading.set(false);
        return EMPTY;
      })
    ).subscribe(() => {
      this.isLoading.set(false);
      this.dialog.close(true);
    });
  }
}
