import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiHeader } from './ui-header';

describe('UiHeader', () => {
  let component: UiHeader;
  let fixture: ComponentFixture<UiHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
