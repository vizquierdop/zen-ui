import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservationsList } from './reservations-list';

describe('AdminReservationsList', () => {
  let component: AdminReservationsList;
  let fixture: ComponentFixture<AdminReservationsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReservationsList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReservationsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
