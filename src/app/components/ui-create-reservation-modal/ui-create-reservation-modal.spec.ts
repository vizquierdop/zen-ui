import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCreateReservationModal } from './ui-create-reservation-modal';

describe('UiCreateReservationModal', () => {
  let component: UiCreateReservationModal;
  let fixture: ComponentFixture<UiCreateReservationModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCreateReservationModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCreateReservationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
