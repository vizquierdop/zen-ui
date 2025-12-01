import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicReservationsList } from './reservations-list';

describe('PublicReservationsList', () => {
  let component: PublicReservationsList;
  let fixture: ComponentFixture<PublicReservationsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicReservationsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicReservationsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
