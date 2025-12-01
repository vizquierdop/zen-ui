import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiBusinessFull } from './ui-business-full';

describe('UiBusinessFull', () => {
  let component: UiBusinessFull;
  let fixture: ComponentFixture<UiBusinessFull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiBusinessFull]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiBusinessFull);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
