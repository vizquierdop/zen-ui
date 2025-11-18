import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHolidays } from './holidays';

describe('AdminHolidays', () => {
  let component: AdminHolidays;
  let fixture: ComponentFixture<AdminHolidays>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHolidays]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminHolidays);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
