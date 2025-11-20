import { CommonModule, DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HolidayCalendar } from '../holiday-calendar/holiday-calendar';
import { HolidayModel } from '../../../../models/entities/holiday.models';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmationModal } from '../../../../components/confirmation-modal/confirmation-modal';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-admin-holidays',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    DatePipe,
    MatTooltipModule,
    HolidayCalendar,
  ],
  providers: [DatePipe],
  templateUrl: './holidays.html',
  styleUrl: './holidays.scss',
})
export class AdminHolidays {
  isLoading = signal(true);
  businessId = 0;
  holidaysList: HolidayModel[] = [];

  selectedDates: HolidayModel[] = [];

  constructor(public dialog: MatDialog, private readonly datePipe: DatePipe) {
    this.loadData();
  }

  loadData(): void {
    // TODO Implement loadData method.
    this.selectedDates = [
      { id: 1, startDate: '2025-01-01', endDate: '2025-01-05', businessId: 1 },
    ];
    this.holidaysList = [
      { id: 1, startDate: '2025-01-01', endDate: '2025-01-05', businessId: 1 },
    ];
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  openAddHolidayModal(): void {
    // TODO Implement openAddHolidayModal method.
  }

  removeHoliday(holiday: HolidayModel): void {
    const message = 'Are you sure you want to remove this holiday?';
    const dialogRef = this.dialog.open(ConfirmationModal, {
      data: { message },
    });

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        if (result) {
          this.isLoading.set(true);
          this.isLoading.set(false);
          // TODO Call DELETE /Holiday/{id}.
          return EMPTY; // TODO change
        }
        return EMPTY;
      })
    ).subscribe(() => {
      this.loadData();
    });
  }
}
