import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiField } from './ui-field';

describe('UiField', () => {
  let component: UiField;
  let fixture: ComponentFixture<UiField>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiField]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiField);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
