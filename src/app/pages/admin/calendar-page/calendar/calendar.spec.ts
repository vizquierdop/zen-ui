import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCalendar } from './calendar';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';
import { ReservationsService } from '../../../../services/reservations.service';
import { UsersService } from '../../../../services/users.service';

describe('AdminCalendar', () => {
  let component: AdminCalendar;
  let fixture: ComponentFixture<AdminCalendar>;

  let usersServiceMock: any;
  let reservationsServiceMock: any;
  let toastrServiceMock: any;

  const mockBusinessId = 77;
  const mockReservationsResponse = {
    items: [],
    totalCount: 0,
  };

  beforeEach(async () => {
    usersServiceMock = {
      user$: of({ businessId: mockBusinessId }),
    };

    reservationsServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of(mockReservationsResponse)),
    };

    toastrServiceMock = {
      error: jasmine.createSpy('error'),
    };

    await TestBed.configureTestingModule({
      imports: [AdminCalendar, NoopAnimationsModule],
      providers: [
        DatePipe,
        provideNativeDateAdapter(),
        { provide: UsersService, useValue: usersServiceMock },
        { provide: ReservationsService, useValue: reservationsServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init using businessId', () => {
    expect(component.businessId).toBe(mockBusinessId);
    expect(reservationsServiceMock.getAll).toHaveBeenCalled();
    
    const args = reservationsServiceMock.getAll.calls.mostRecent().args[0];
    expect(args.businessId).toBe(mockBusinessId);
    expect(args.startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(args.endDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it('should navigate to next week', () => {
    const initialStart = new Date(component.startWeekDate);
    
    component.nextWeek();

    const expectedDate = new Date(initialStart);
    expectedDate.setDate(expectedDate.getDate() + 7);
    
    expect(component.startWeekDate.getTime()).toBe(expectedDate.getTime());
    
    expect(reservationsServiceMock.getAll).toHaveBeenCalledTimes(2);
  });

  it('should navigate to previous week', () => {
    const initialStart = new Date(component.startWeekDate);
    
    component.previousWeek();

    const expectedDate = new Date(initialStart);
    expectedDate.setDate(expectedDate.getDate() - 7);
    
    expect(component.startWeekDate.getTime()).toBe(expectedDate.getTime());
    expect(reservationsServiceMock.getAll).toHaveBeenCalledTimes(2);
  });

  it('should update view when picking a month (setMonth)', () => {
    const selectedDate = new Date(2026, 5, 15);
    
    component.setMonth(selectedDate);

    expect(component.month).toBe(5);
    expect(component.year).toBe(2026);
    
    expect(reservationsServiceMock.getAll).toHaveBeenCalled();
  });

  it('should handle error when loading data', () => {
    reservationsServiceMock.getAll.and.returnValue(throwError(() => new Error('Error')));
    component.loadData();

    expect(component.isLoading()).toBeFalse();
    expect(toastrServiceMock.error).toHaveBeenCalledWith('Error loading reservations');
  });
});
