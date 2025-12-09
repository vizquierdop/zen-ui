import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReservationModal } from './update-reservation-modal';

describe('UpdateReservationModal', () => {
  let component: UpdateReservationModal;
  let fixture: ComponentFixture<UpdateReservationModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateReservationModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateReservationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
