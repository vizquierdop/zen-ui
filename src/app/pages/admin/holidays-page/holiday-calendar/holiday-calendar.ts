import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses, MatDatepickerModule } from '@angular/material/datepicker';
import { CalendarModule } from 'angular-calendar';
import { BlankHeaderCalendar } from './blank-header-calendar/blank-header-calendar';
import { HolidayModel } from '../../../../models/entities/holiday.models';

const MONTH_NAMES: string[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

@Component({
  selector: 'app-holiday-calendar',
  imports: [CommonModule, MatDatepickerModule, BlankHeaderCalendar, DatePipe],
  providers: [DatePipe],
  templateUrl: './holiday-calendar.html',
  styleUrl: './holiday-calendar.scss',
})
export class HolidayCalendar implements OnInit {
  @Input() month = 0;
  @Input() selectedDates: HolidayModel[] = [];

  customHeaderComponent = BlankHeaderCalendar;

  monthName = '';

  currentDate = new Date();
  startAt = new Date();

  constructor(private readonly datePipe: DatePipe) {}

  ngOnInit(): void {
    this.monthName = MONTH_NAMES[this.month];
    this.startAt = new Date(this.currentDate.getFullYear(), this.month, 1);
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const dateTransformed = this.datePipe.transform(date, 'yyyy-MM-dd')!;
      const foundDate = this.selectedDates.find((d) => {
        return (
          d.startDate === dateTransformed ||
          d.endDate === dateTransformed ||
          (d.startDate < dateTransformed && d.endDate > dateTransformed)
        );
      });
      return foundDate ? 'highlighted' : '';
    };
  }
}
