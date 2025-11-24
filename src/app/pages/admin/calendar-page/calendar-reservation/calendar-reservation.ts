import { Component, Input } from '@angular/core';
import { ReservationModel } from '../../../../models/entities/reservation.models';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CalendarReservationDetails } from '../modals/calendar-reservation-details/calendar-reservation-details';

@Component({
  selector: 'app-calendar-reservation',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './calendar-reservation.html',
  styleUrl: './calendar-reservation.scss',
})
export class CalendarReservation {
  @Input() reservation!: ReservationModel;

  constructor(private dialog: MatDialog) {}

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
