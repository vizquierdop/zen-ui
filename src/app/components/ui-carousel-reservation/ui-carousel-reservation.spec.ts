import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCarouselReservation } from './ui-carousel-reservation';

describe('UiCarouselReservation', () => {
  let component: UiCarouselReservation;
  let fixture: ComponentFixture<UiCarouselReservation>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCarouselReservation]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCarouselReservation);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
