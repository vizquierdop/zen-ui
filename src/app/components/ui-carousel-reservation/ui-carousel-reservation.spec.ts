import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCarouselReservation } from './ui-carousel-reservation';
import { Router } from '@angular/router';

describe('UiCarouselReservation', () => {
  let component: UiCarouselReservation;
  let fixture: ComponentFixture<UiCarouselReservation>;

  const routerMock = { navigate: jasmine.createSpy('navigate') };

  const mockReservation = {
    id: 1,
    date: '2026-01-01',
    startTime: '10:00',
    endTime: '11:00',
    status: 'PENDING',
    service: { name: 'Test Service', duration: 60 },
    business: { name: 'Test Business' }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCarouselReservation],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCarouselReservation);
    component = fixture.componentInstance;
    component.reservation = mockReservation as any;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
