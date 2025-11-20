import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlankHeaderCalendar } from './blank-header-calendar';

describe('BlankHeaderCalendar', () => {
  let component: BlankHeaderCalendar;
  let fixture: ComponentFixture<BlankHeaderCalendar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlankHeaderCalendar]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BlankHeaderCalendar);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
