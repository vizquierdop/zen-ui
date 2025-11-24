import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { OfferedServiceModel } from '../../../../../models/entities/offered-service.models';

@Component({
  selector: 'app-create-update-service-modal',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  templateUrl: './create-update-service-modal.html',
  styleUrl: './create-update-service-modal.scss',
})
export class CreateUpdateServiceModal implements OnInit {
  isLoading = signal(false);
  type: 'create' | 'update' = 'create';
  offeredService: OfferedServiceModel | null = null;

  offeredServiceForm: FormGroup;

  constructor(
    private readonly dialog: MatDialogRef<CreateUpdateServiceModal>,
    @Inject(MAT_DIALOG_DATA) public data: {
      type: 'create' | 'update',
      service: OfferedServiceModel | null,
    },
    private readonly fb: FormBuilder
  ) {
    this.type = this.data.type;
    if (this.data.service) {
      this.offeredService = this.data.service;
    }
    this.offeredServiceForm = this.fb.group({
      id: [null],
      name: [null, [Validators.required]],
      description: [null],
      duration: [null],
      price: [null, [Validators.required]],
      active: [true],
    });
  }

  ngOnInit(): void {
    // TODO Implement loadData method if edit mode.
    if (this.type === 'update' && this.offeredService) {
      this.offeredServiceForm.patchValue(this.offeredService);
    }
  }

  save(): void {
    // TODO Implement save method.
  }

  close(): void {
    this.dialog.close(null);
  }
}
