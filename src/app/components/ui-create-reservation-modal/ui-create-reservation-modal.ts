import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { OfferedServiceModel } from '../../models/entities/offered-service.models';
import { UiField } from '../ui-field/ui-field';
import { UISelectModel } from '../../models/basic/ui-select.model';

@Component({
  selector: 'app-ui-create-reservation-modal',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSelectModule,
    MatDatepickerModule,
    UiField,
  ],
  templateUrl: './ui-create-reservation-modal.html',
  styleUrl: './ui-create-reservation-modal.scss',
})
export class UiCreateReservationModal implements OnInit {
  isLoading = signal<boolean>(false);
  service: OfferedServiceModel | null = null;

  hourOptions: UISelectModel[] = [
    {
      label: '16:00',
      value: '16:00',
    },
  ];
  reservationForm: FormGroup;

  constructor(
    private readonly dialog: MatDialogRef<UiCreateReservationModal>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      service: OfferedServiceModel;
    },
    private readonly fb: FormBuilder
  ) {
    this.service = this.data.service;
    this.reservationForm = this.fb.group({
      date: [null, [Validators.required]],
      startTime: [null, Validators.required],
      endTime: [null],
      customerId: [null],
      serviceId: [null],
    });
  }

  ngOnInit(): void {}

  close(): void {
    void this.dialog.close(null);
  }

  save(): void {
    this.isLoading.set(true);
    // TODO Implement create reservation request method.
    setTimeout(() => {
      this.isLoading.set(false);
      void this.dialog.close(true);
    }, 500);
  }
}
