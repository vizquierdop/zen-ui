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
import { OfferedServicesService } from '../../../../../services/offered-services.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { OfferedServiceCreateRequestDTO, OfferedServiceUpdateRequestDTO } from '../../../../../models/dtos/offered-service.dto.models';
import { catchError, EMPTY } from 'rxjs';

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
    ToastrModule,
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
      businessId: number,
      type: 'create' | 'update',
      service: OfferedServiceModel | null,
    },
    private readonly fb: FormBuilder,
    private readonly offeredServicesService: OfferedServicesService,
    private toastr: ToastrService,
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
      isActive: [true],
      businessId: [this.data.businessId],
    });
  }

  ngOnInit(): void {
    // TODO Implement loadData method if edit mode.
    if (this.type === 'update' && this.offeredService) {
      this.offeredServiceForm.patchValue(this.offeredService);
    }
  }

  save(): void {
    this.isLoading.set(true);
    if (this.type === 'create') {
      const request: OfferedServiceCreateRequestDTO = {
        name: this.offeredServiceForm.get('name')?.value,
        description: this.offeredServiceForm.get('description')?.value,
        duration: +this.offeredServiceForm.get('duration')?.value,
        price: +this.offeredServiceForm.get('price')?.value,
        isActive: this.offeredServiceForm.get('isActive')?.value,
        businessId: this.offeredServiceForm.get('businessId')?.value,
      };
      this.offeredServicesService.create(request).pipe(
        catchError(() => {
          this.isLoading.set(false);
          this.toastr.error('Error creating offered service');
          return EMPTY;
        })
      ).subscribe(() => {
        this.isLoading.set(false);
        this.toastr.success('Offered service created successfully');
        this.dialog.close(true);
      });
    } else {
      const request: OfferedServiceUpdateRequestDTO = {
        id: this.offeredServiceForm.get('id')?.value,
        name: this.offeredServiceForm.get('name')?.value,
        description: this.offeredServiceForm.get('description')?.value,
        duration: +this.offeredServiceForm.get('duration')?.value,
        price: +this.offeredServiceForm.get('price')?.value,
        isActive: this.offeredServiceForm.get('isActive')?.value,
        businessId: this.offeredServiceForm.get('businessId')?.value,
      };

      this.offeredServicesService.update(request).pipe(
        catchError(() => {
          this.isLoading.set(false);
          this.toastr.error('Error updating offered service');
          return EMPTY;
        })
      ).subscribe(() => {
        this.isLoading.set(false);
        this.toastr.success('Offered service updated successfully');
        this.dialog.close(true);
      });
    }
  }

  close(): void {
    this.dialog.close(null);
  }
}
