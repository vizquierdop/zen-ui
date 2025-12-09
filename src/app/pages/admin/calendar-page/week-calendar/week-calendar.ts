import { CommonModule } from '@angular/common';
import { Component, computed, Input, input } from '@angular/core';
import { CalendarReservation } from '../calendar-reservation/calendar-reservation';
import { ReservationModel } from '../../../../models/entities/reservation.models';

@Component({
  selector: 'app-week-calendar',
  imports: [CommonModule, CalendarReservation],
  templateUrl: './week-calendar.html',
  styleUrl: './week-calendar.scss',
})
export class WeekCalendar {
  startWeek = input.required<Date>();

  @Input() reservations: ReservationModel[] = [];

  readonly dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  weekDays = computed(() => {
    const start = this.startWeek();
    if (!start) return [];

    const days: Date[] = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      days.push(d);
    }
    return days;
  });

  getReservationsForDay(day: Date): ReservationModel[] {
    return this.reservations.filter((reservation) => {
      const resDate = new Date(reservation.date);

      return (
        resDate.getFullYear() === day.getFullYear() &&
        resDate.getMonth() === day.getMonth() &&
        resDate.getDate() === day.getDate()
      );
    });
  }
}
