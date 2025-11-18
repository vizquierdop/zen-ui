import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCalendar } from './calendar';

describe('AdminCalendar', () => {
  let component: AdminCalendar;
  let fixture: ComponentFixture<AdminCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
