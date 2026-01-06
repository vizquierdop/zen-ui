import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarReservation } from './calendar-reservation';
import { ReservationStatusType } from '../../../../models/enums/reservation-status-type.enum';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

describe('CalendarReservation', () => {
  let component: CalendarReservation;
  let fixture: ComponentFixture<CalendarReservation>;

  let dialogMock: any;

  const mockReservation = {
    id: 1,
    status: ReservationStatusType.PENDING,
    customerName: 'Test Customer',
    date: new Date(),
    startTime: '10:00',
    endTime: '11:00'
  };

  beforeEach(async () => {
    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({})
    };

    await TestBed.configureTestingModule({
      imports: [CalendarReservation]
    })
    .overrideComponent(CalendarReservation, {
      remove: { imports: [MatDialogModule] },
      add: { providers: [{ provide: MatDialog, useValue: dialogMock }] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarReservation);
    component = fixture.componentInstance;

    component.reservation = { ...mockReservation } as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set correct class based on status PENDING', () => {
    expect(component.reservationClass).toBe('pending');
  });

  it('should set correct class based on status ACCEPTED', () => {
    component.reservation.status = ReservationStatusType.ACCEPTED;
    component.ngOnInit();
    expect(component.reservationClass).toBe('accepted');
  });

  it('should set correct class based on status CANCELLED', () => {
    component.reservation.status = ReservationStatusType.CANCELLED;
    component.ngOnInit();
    expect(component.reservationClass).toBe('cancelled');
  });

  it('should set correct class based on status COMPLETED', () => {
    component.reservation.status = ReservationStatusType.COMPLETED;
    component.ngOnInit();
    expect(component.reservationClass).toBe('completed');
  });
});
