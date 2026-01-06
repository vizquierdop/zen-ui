import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeekCalendar } from './week-calendar';
import { ReservationModel } from '../../../../models/entities/reservation.models';
import { MatDialog } from '@angular/material/dialog';

describe('WeekCalendar', () => {
  let component: WeekCalendar;
  let fixture: ComponentFixture<WeekCalendar>;

  const dialogMock = { open: jasmine.createSpy('open') };

  const mockStartDate = new Date(2025, 0, 1); 

  const mockReservations: ReservationModel[] = [
    {
      id: 1,
      date: new Date(2026, 0, 1),
      customerName: 'Test Customer 1',
      status: 0
    } as any,
    {
      id: 2,
      date: new Date(2026, 0, 2),
      customerName: 'Test Customer 2',
      status: 0
    } as any
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeekCalendar],
      providers: [
        { provide: MatDialog, useValue: dialogMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeekCalendar);
    component = fixture.componentInstance;

    fixture.componentRef.setInput('startWeek', mockStartDate);
    component.reservations = mockReservations;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should calculate the 7 days of the week based on startWeek', () => {
    const days = component.weekDays();
    
    expect(days.length).toBe(7);
    
    expect(days[0].getDate()).toBe(1);
    expect(days[0].getMonth()).toBe(0);

    expect(days[6].getDate()).toBe(7);
  });

  it('should filter reservations for a specific day correctly', () => {
    const monday = new Date(2026, 0, 1);
    const mondayRes = component.getReservationsForDay(monday);
    
    expect(mondayRes.length).toBe(1);
    expect(mondayRes[0].customerName).toBe('Test Customer 1');

    const wednesday = new Date(2026, 0, 3);
    const wednesdayRes = component.getReservationsForDay(wednesday);
    
    expect(wednesdayRes.length).toBe(0);
  });

  it('should recalculate days if startWeek signal changes', () => {
    const nextWeek = new Date(2026, 0, 8);
    
    fixture.componentRef.setInput('startWeek', nextWeek);
    fixture.detectChanges();

    const days = component.weekDays();
    expect(days[0].getDate()).toBe(8);
    expect(days[6].getDate()).toBe(14);
  });
});
