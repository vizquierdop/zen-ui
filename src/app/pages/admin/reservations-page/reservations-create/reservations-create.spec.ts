import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservationsCreate } from './reservations-create';

describe('AdminReservationsCreate', () => {
  let component: AdminReservationsCreate;
  let fixture: ComponentFixture<AdminReservationsCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminReservationsCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReservationsCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
