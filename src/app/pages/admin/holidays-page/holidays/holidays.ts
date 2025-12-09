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
import { catchError, EMPTY, switchMap } from 'rxjs';
import { AddHolidayModal } from '../modals/add-holiday-modal/add-holiday-modal';
import { HolidaysService } from '../../../../services/holidays.service';
import { HolidayGetAllRequestDTO, HolidayGetAllResponseDTO } from '../../../../models/dtos/holiday.dto.models';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../services/users.service';

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
    ToastrModule,
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

  constructor(
    public dialog: MatDialog,
    private readonly datePipe: DatePipe,
    private readonly holidaysService: HolidaysService,
    private readonly toastr: ToastrService,
    private readonly usersService: UsersService
  ) {
    this.usersService.user$.subscribe((user) => {
      this.businessId = user!.businessId!;
      this.loadData();
    });
  }

  loadData(): void {
    this.isLoading.set(true);
    const currentYear = new Date().getFullYear();

    const formatDate = (date: Date) => date.toISOString().split('T')[0];
    const request: HolidayGetAllRequestDTO = {
      businessId: this.businessId,
      startDate: formatDate(new Date(currentYear, 0, 1)),
      endDate: formatDate(new Date(currentYear+1, 0, 1)),
      paginationLength: 9999,
    };
    this.holidaysService.getAll(request).pipe(
      catchError(() => {
        this.isLoading.set(false);
        this.toastr.error('Error loading holidays');
        return EMPTY;
      })
    ).subscribe((response: HolidayGetAllResponseDTO) => {
      this.holidaysList = response.items;
      this.selectedDates = response.items;
      this.isLoading.set(false);
    });
  }

  openAddHolidayModal(): void {
    const dialogRef = this.dialog.open(AddHolidayModal, {
      data: { businessId: this.businessId },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  removeHoliday(holiday: HolidayModel): void {
    const message = 'Are you sure you want to remove this holiday?';
    const dialogRef = this.dialog.open(ConfirmationModal, {
      data: { message },
    });

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result) {
            this.isLoading.set(true);
            this.isLoading.set(false);
            return this.holidaysService.delete(holiday.id);
          }
          return EMPTY;
        })
      )
      .subscribe(() => {
        this.toastr.success('Holiday removed successfully');
        this.loadData();
      });
  }
}
