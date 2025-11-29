import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiPageHeader } from './ui-page-header';

describe('UiPageHeader', () => {
  let component: UiPageHeader;
  let fixture: ComponentFixture<UiPageHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiPageHeader]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiPageHeader);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
