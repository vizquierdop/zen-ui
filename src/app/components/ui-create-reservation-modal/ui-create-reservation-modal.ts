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
import { UsersService } from '../../services/users.service';
import { ReservationsService } from '../../services/reservations.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ReservationCreateRequestDTO } from '../../models/dtos/reservation.dto.models';
import { ReservationStatusType } from '../../models/enums/reservation-status-type.enum';
import { catchError, EMPTY } from 'rxjs';

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
    ToastrModule,
  ],
  templateUrl: './ui-create-reservation-modal.html',
  styleUrl: './ui-create-reservation-modal.scss',
})
export class UiCreateReservationModal implements OnInit {
  isLoading = signal<boolean>(false);
  service: OfferedServiceModel | null = null;

  // hourOptions: UISelectModel[] = [
  //   {
  //     label: '16:00',
  //     value: '16:00',
  //   },
  // ];
  reservationForm: FormGroup;
  userId!: number;

  constructor(
    private readonly dialog: MatDialogRef<UiCreateReservationModal>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      service: OfferedServiceModel;
    },
    private readonly fb: FormBuilder,
    private readonly usersService: UsersService,
    private readonly reservationsService: ReservationsService,
    private readonly toastr: ToastrService,
  ) {
    this.service = this.data.service;
    this.reservationForm = this.fb.group({
      date: [null, [Validators.required]],
      startTime: [null, Validators.required],
      endTime: [null],
      userId: [null],
      serviceId: [this.service.id],
    });
  }

  ngOnInit(): void {
    this.usersService.user$.subscribe((user) => {
      this.userId = user!.id;
      this.reservationForm.get('userId')?.setValue(this.userId);
    });

    this.reservationForm.get('startTime')?.valueChanges.subscribe((startTime: string | null) => {
      if (!startTime || !this.service?.duration) {
        return;
      }

      const [hours, minutes] = startTime.split(':').map(Number);

      const date = new Date();
      date.setHours(hours);
      date.setMinutes(minutes);

      date.setMinutes(date.getMinutes() + this.service.duration);

      const endHours = date.getHours().toString().padStart(2, '0');
      const endMinutes = date.getMinutes().toString().padStart(2, '0');
      const endTimeString = `${endHours}:${endMinutes}`;

      this.reservationForm.patchValue({ endTime: endTimeString });
    });
  }

  close(): void {
    void this.dialog.close(null);
  }

  save(): void {
    this.isLoading.set(true);
    const request: ReservationCreateRequestDTO = {
      date: this.reservationForm.get('date')?.value,
      startTime: this.reservationForm.get('startTime')?.value,
      endTime: this.reservationForm.get('endTime')?.value,
      userId: this.reservationForm.get('userId')?.value,
      serviceId: this.reservationForm.get('serviceId')?.value,
      status: ReservationStatusType.PENDING,
    };

    this.reservationsService.create(request).pipe(
      catchError(() => {
        this.isLoading.set(false);
        this.toastr.error('Error creating reservation request');
        return EMPTY;
      })
    ).subscribe((response) => {
      this.isLoading.set(false);
      this.toastr.success('Reservation request created successfully');
      void this.dialog.close(response);
    });
  }
}
