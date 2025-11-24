import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ReservationModel } from '../../../../../models/entities/reservation.models';
import { UiField } from '../../../../../components/ui-field/ui-field';
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: 'app-calendar-reservation-details',
  imports: [CommonModule, MatDialogModule, MatButtonModule, MatIconModule, UiField, MatInputModule],
  templateUrl: './calendar-reservation-details.html',
  styleUrl: './calendar-reservation-details.scss',
})
export class CalendarReservationDetails {
  reservation: ReservationModel;
  constructor(
    public dialogRef: MatDialogRef<CalendarReservationDetails>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      reservation: ReservationModel;
    }
  ) {
    this.reservation = this.data.reservation;
  }

  close(): void {
    this.dialogRef.close();
  }
}
