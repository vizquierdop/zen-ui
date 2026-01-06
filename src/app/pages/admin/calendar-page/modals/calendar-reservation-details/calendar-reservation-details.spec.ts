import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarReservationDetails } from './calendar-reservation-details';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CalendarReservationDetails', () => {
  let component: CalendarReservationDetails;
  let fixture: ComponentFixture<CalendarReservationDetails>;

  let dialogRefMock: any;
  const mockReservation = {
    id: 1,
    customerName: 'Test Customer',
    customerPhone: '600100200',
    status: 'PENDING',
    date: '2025-01-01',
    startTime: '10:00',
    endTime: '11:00',
    service: { name: 'Haircut' },
  };

  beforeEach(async () => {
    dialogRefMock = {
      close: jasmine.createSpy('close'),
    };

    await TestBed.configureTestingModule({
      imports: [
        CalendarReservationDetails,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { reservation: mockReservation },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CalendarReservationDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize reservation data from dialog data', () => {
    expect(component.reservation).toEqual(mockReservation as any);
    expect(component.reservation.customerName).toBe('Test Customer');
  });

  it('should close the dialog when close is called', () => {
    component.close();
    expect(dialogRefMock.close).toHaveBeenCalledTimes(1);
  });
});
