import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { UISelectModel } from '../../../../../models/basic/ui-select.model';

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
    private readonly dialog: MatDialogRef<AddCategoryModal>,
    private readonly fb: FormBuilder
  ) {
    this.addCategoryForm = this.fb.group({
      categoryId: [null, [Validators.required]],
    });

    this.loadSelectValues();
  }

  loadSelectValues(): void {
    // TODO Implement loadSelectValues method.
  }

  close(): void {
    this.dialog.close(null);
  }

  save(): void {
    // TODO Implement save method.
  }
}
