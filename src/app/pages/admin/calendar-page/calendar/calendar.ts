import { CommonModule, DatePipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MONTH_NAMES } from '../../../../utils/lists/month-names';
import { WeekCalendar } from '../week-calendar/week-calendar';
import { UsersService } from '../../../../services/users.service';
import { ReservationsService } from '../../../../services/reservations.service';
import { ReservationGetAllRequestDTO } from '../../../../models/dtos/reservation.dto.models';
import { catchError, EMPTY } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { ReservationModel } from '../../../../models/entities/reservation.models';

@Component({
  selector: 'app-admin-calendar',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    WeekCalendar,
    ToastrModule,
  ],
  providers: [DatePipe],
  templateUrl: './calendar.html',
  styleUrl: './calendar.scss',
})
export class AdminCalendar {
  isLoading = signal<boolean>(true);

  month = new Date().getMonth();
  year = new Date().getFullYear();
  activeDate = new Date();

  startWeekDate = this.getStartOfWeek(new Date());
  endWeekDate = this.getEndOfWeek(this.startWeekDate);

  reservations: ReservationModel[] = [];

  businessId!: number;

  constructor(
    private readonly usersService: UsersService,
    private readonly reservationsService: ReservationsService,
    private readonly toastr: ToastrService,
    private readonly datePipe: DatePipe,
  ) {
    this.usersService.user$.subscribe((user) => {
      this.businessId = user!.businessId!;
      this.loadData();
    });
  }

  loadData(): void {
    this.isLoading.set(true);
    const request: ReservationGetAllRequestDTO = {
      businessId: this.businessId,
      startDate: this.datePipe.transform(this.startWeekDate, 'yyyy-MM-dd')!,
      endDate: this.datePipe.transform(this.endWeekDate, 'yyyy-MM-dd')!,
      paginationLength: 9999,
    };

    this.reservationsService.getAll(request).pipe(
      catchError(() => {
        this.isLoading.set(false);
        this.toastr.error('Error loading reservations');
        return EMPTY;
      })
    ).subscribe((response) => {
      this.isLoading.set(false);
      this.reservations = response.items;
    });
  }

  getMonthName(month: number): string {
    return MONTH_NAMES[month];
  }

  // -----------------------------
  //  Dates calculation handlers
  // -----------------------------

  getStartOfWeek(date: Date): Date {
    const day = date.getDay();
    const diff = day === 0 ? -6 : 1 - day;
    return new Date(date.getFullYear(), date.getMonth(), date.getDate() + diff);
  }
  getEndOfWeek(startDate: Date): Date {
    const end = new Date(startDate);
    end.setDate(startDate.getDate() + 6);
    return end;
  }

  updateMonthYearFromWeek(): void {
    this.month = this.startWeekDate.getMonth();
    this.year = this.startWeekDate.getFullYear();
    this.activeDate = new Date(this.year, this.month, 1);

    this.loadData();
  }

  //  Week navigation
  previousWeek(): void {
    const prevStart = new Date(this.startWeekDate);
    prevStart.setDate(prevStart.getDate() - 7);

    this.startWeekDate = prevStart;
    this.endWeekDate = this.getEndOfWeek(prevStart);

    this.updateMonthYearFromWeek();
  }

  nextWeek(): void {
    const nextStart = new Date(this.startWeekDate);
    nextStart.setDate(nextStart.getDate() + 7);

    this.startWeekDate = nextStart;
    this.endWeekDate = this.getEndOfWeek(nextStart);

    this.updateMonthYearFromWeek();
  }

  setMonth(date: Date): void {
    this.month = date.getMonth();
    this.year = date.getFullYear();
    this.activeDate = date;

    const firstOfMonth = new Date(this.year, this.month, 1);

    this.startWeekDate = this.getStartOfWeek(firstOfMonth);
    this.endWeekDate = this.getEndOfWeek(this.startWeekDate);

    this.loadData();
  }
}
