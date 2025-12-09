import { AfterViewInit, Component, Input } from '@angular/core';
import { ReservationModel } from '../../../../models/entities/reservation.models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CalendarReservationDetails } from '../modals/calendar-reservation-details/calendar-reservation-details';
import { ReservationStatusType } from '../../../../models/enums/reservation-status-type.enum';

@Component({
  selector: 'app-calendar-reservation',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './calendar-reservation.html',
  styleUrl: './calendar-reservation.scss',
})
export class CalendarReservation implements AfterViewInit {
  @Input() reservation!: ReservationModel;

  reservationClass = 'pending';

  constructor(private dialog: MatDialog) {}

  ngAfterViewInit(): void {
    if (this.reservation.status === ReservationStatusType.ACCEPTED) {
      this.reservationClass = 'accepted';
    } else if (this.reservation.status === ReservationStatusType.CANCELLED) {
      this.reservationClass = 'cancelled';
    } else if (this.reservation.status === ReservationStatusType.PENDING) {
      this.reservationClass = 'pending';
    } else if (this.reservation.status === ReservationStatusType.COMPLETED) {
      this.reservationClass = 'completed';
    }
  }

  openReservationDetailsModal(): void {
    const dialogRef = this.dialog.open(CalendarReservationDetails, {
      data: {
        reservation: this.reservation,
      },
      minWidth: '850px',
      maxWidth: '850px',
    });
  }
}
