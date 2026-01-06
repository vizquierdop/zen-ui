import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HolidayCalendar } from './holiday-calendar';
import { DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MONTH_NAMES } from '../../../../utils/lists/month-names';

describe('HolidayCalendar', () => {
  let component: HolidayCalendar;
  let fixture: ComponentFixture<HolidayCalendar>;

  const mockHolidays = [
    {
      id: 1,
      name: 'Christmas',
      startDate: '2025-12-25T00:00:00',
      endDate: '2025-12-26T00:00:00',
      businessId: 1,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HolidayCalendar, NoopAnimationsModule],
      providers: [DatePipe, provideNativeDateAdapter()],
    }).compileComponents();

    fixture = TestBed.createComponent(HolidayCalendar);
    component = fixture.componentInstance;

    component.month = 11;
    component.selectedDates = mockHolidays;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize monthName and startAt correctly on init', () => {
    expect(component.monthName).toBe(MONTH_NAMES[11]);

    const expectedStart = new Date(component.currentDate.getFullYear(), 11, 1);

    expect(component.startAt.getFullYear()).toBe(expectedStart.getFullYear());
    expect(component.startAt.getMonth()).toBe(expectedStart.getMonth());
    expect(component.startAt.getDate()).toBe(1);
  });

  it('should highlight dates included in selectedDates', () => {
    const dateClassFunc = component.dateClass();

    const holidayDate = new Date(2025, 11, 25);
    const resultHoliday = dateClassFunc(holidayDate);
    expect(resultHoliday).toBe('highlighted');

    const holidayDateEnd = new Date(2025, 11, 26);
    const resultHolidayEnd = dateClassFunc(holidayDateEnd);
    expect(resultHolidayEnd).toBe('highlighted');
  });

  it('should NOT highlight dates outside selectedDates', () => {
    const dateClassFunc = component.dateClass();

    const normalDate = new Date(2025, 11, 24);
    const resultNormal = dateClassFunc(normalDate);

    expect(resultNormal).toBe('');
  });
});
