import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ReservationModel } from '../../../../../models/entities/reservation.models';
import { ReservationsService } from '../../../../../services/reservations.service';
import { ReservationUpdateRequestDTO } from '../../../../../models/dtos/reservation.dto.models';
import { catchError, EMPTY } from 'rxjs';
import { UISelectModel } from '../../../../../models/basic/ui-select.model';
import { EnumService } from '../../../../../services/enum.service';

@Component({
  selector: 'app-update-reservation-modal',
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
    MatDatepickerModule
  ],
  templateUrl: './update-reservation-modal.html',
  styleUrl: './update-reservation-modal.scss',
})
export class UpdateReservationModal implements OnInit {
  isLoading = signal(false);
  reservation!: ReservationModel;
  reservationStatusTypeOptions: UISelectModel[] = [];
  reservationForm: FormGroup;

  constructor(
    private readonly dialog: MatDialogRef<UpdateReservationModal>,
    @Inject(MAT_DIALOG_DATA) public data: { reservation: ReservationModel },
    private readonly fb: FormBuilder,
    private readonly reservationsService: ReservationsService,
    private readonly toastr: ToastrService,
    private enumService: EnumService,
  ) {
    if (this.data.reservation) {
      this.reservation = this.data.reservation;
    }
    this.reservationForm = this.fb.group({
      id: [this.reservation.id, Validators.required],
      customerName: [null, Validators.required],
      customerEmail: [null],
      customerPhone: [null, Validators.required],
      serviceId: [this.reservation.serviceId, Validators.required],
      status: [this.reservation.status],
      date: [this.reservation.date, Validators.required],
      startTime: [this.reservation.startTime, Validators.required],
      endTime: [this.reservation.endTime, Validators.required],
      userId: [this.reservation.userId],
      // comments: [null],
    });
  }

  ngOnInit(): void {
    if (this.reservation.userId) {
      this.reservationForm.get('customerName')?.setValue(`${this.reservation.user?.firstName} ${this.reservation.user?.lastName}`);
      this.reservationForm.get('customerName')?.disable();
      this.reservationForm.get('customerEmail')?.setValue(this.reservation.user?.email);
      this.reservationForm.get('customerEmail')?.disable();
      this.reservationForm.get('customerPhone')?.setValue(this.reservation.user?.phone);
      this.reservationForm.get('customerPhone')?.disable();
    } else {
      this.reservationForm.get('customerName')?.setValue(this.reservation.customerName);
      this.reservationForm.get('customerName')?.enable();
      this.reservationForm.get('customerEmail')?.setValue(this.reservation.customerEmail);
      this.reservationForm.get('customerEmail')?.enable();
      this.reservationForm.get('customerPhone')?.setValue(this.reservation.customerPhone);
      this.reservationForm.get('customerPhone')?.enable();
    }

    this.reservationStatusTypeOptions = this.enumService.getReservationStatusTypeOptions();
  }

  save(): void {
    this.isLoading.set(true);
    const request: ReservationUpdateRequestDTO = {
      id: this.reservationForm.get('id')?.value,
      serviceId: this.reservationForm.get('serviceId')?.value,
      date: this.reservationForm.get('date')?.value,
      startTime: this.reservationForm.get('startTime')?.value,
      endTime: this.reservationForm.get('endTime')?.value,
      status: this.reservationForm.get('status')?.value,
    };

    if (!this.reservation.userId) {
      request.customerName = this.reservationForm.get('customerName')?.value;
      request.customerEmail = this.reservationForm.get('customerEmail')?.value;
      request.customerPhone = this.reservationForm.get('customerPhone')?.value;
    }

    this.reservationsService.update(request).pipe(
      catchError(() => {
        this.isLoading.set(false);
        this.toastr.error('Error updating reservation');
        return EMPTY;
      })
    ).subscribe(() => {
      this.isLoading.set(false);
      this.toastr.success('Reservation updated successfully');
      this.dialog.close(true);
    });
  }

  close(): void {
    this.dialog.close(null);
  }
}
