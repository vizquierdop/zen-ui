import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiReservationFull } from './ui-reservation-full';

describe('UiReservationFull', () => {
  let component: UiReservationFull;
  let fixture: ComponentFixture<UiReservationFull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiReservationFull]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiReservationFull);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
