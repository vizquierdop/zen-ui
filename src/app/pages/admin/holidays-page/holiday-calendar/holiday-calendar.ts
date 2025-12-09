import { CommonModule, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses, MatDatepickerModule } from '@angular/material/datepicker';
import { BlankHeaderCalendar } from './blank-header-calendar/blank-header-calendar';
import { HolidayModel } from '../../../../models/entities/holiday.models';
import { MONTH_NAMES } from '../../../../utils/lists/month-names';

@Component({
  selector: 'app-holiday-calendar',
  imports: [CommonModule, MatDatepickerModule],
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

      const isHoliday = this.selectedDates.some((d) => {
        const start = d.startDate.split('T')[0];
        const end = d.endDate.split('T')[0];

        return dateTransformed >= start && dateTransformed <= end;
      });

      return isHoliday ? 'highlighted' : '';
    };
  }
}
