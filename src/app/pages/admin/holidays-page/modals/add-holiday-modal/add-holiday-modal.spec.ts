import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHolidayModal } from './add-holiday-modal';

describe('AddHolidayModal', () => {
  let component: AddHolidayModal;
  let fixture: ComponentFixture<AddHolidayModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddHolidayModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddHolidayModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
