import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarReservationDetails } from './calendar-reservation-details';

describe('CalendarReservationDetails', () => {
  let component: CalendarReservationDetails;
  let fixture: ComponentFixture<CalendarReservationDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarReservationDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarReservationDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
