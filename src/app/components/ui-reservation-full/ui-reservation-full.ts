import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReservationModel } from '../../models/entities/reservation.models';
import { Router } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ReservationsService } from '../../services/reservations.service';
import { ConfirmationModal } from '../confirmation-modal/confirmation-modal';
import { catchError, EMPTY, switchMap } from 'rxjs';
import { ReservationStatusType } from '../../models/enums/reservation-status-type.enum';
import { ReservationUpdateRequestDTO } from '../../models/dtos/reservation.dto.models';

@Component({
  selector: 'app-ui-reservation-full',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ToastrModule,
    ConfirmationModal,
  ],
  templateUrl: './ui-reservation-full.html',
  styleUrl: './ui-reservation-full.scss',
})
export class UiReservationFull {
  @Input() reservation!: ReservationModel;
  @Output() hasToReload$ = new EventEmitter<void>();

  constructor(
    private router: Router,
    private readonly toastr: ToastrService,
    private readonly reservationsService: ReservationsService,
    private readonly dialog: MatDialog,
    
  ) {}

  viewBusiness(): void {
    void this.router.navigate([`public/businesses/${this.reservation.service?.business?.id}`]);
  }

  cancelReservation(): void {
    const dialogRef = this.dialog.open(ConfirmationModal, {
      data: {
        message: 'The reservation will be cancelled. Do you want to continue?',
      },
    });

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          const request: ReservationUpdateRequestDTO = {
            id: this.reservation.id,
            date: this.reservation.date,
            endTime: this.reservation.endTime,
            serviceId: this.reservation.serviceId,
            startTime: this.reservation.startTime,
            status: ReservationStatusType.CANCELLED
          };
          return this.reservationsService.update(request);
        }
        return EMPTY;
      }),
      catchError(() => {
        this.toastr.error('Error cancelling reservation');
        return EMPTY;
      })
    ).subscribe(() => {
      this.toastr.success('Reservation cancelled successfully');
      this.hasToReload$.emit();
    });
  }
}
