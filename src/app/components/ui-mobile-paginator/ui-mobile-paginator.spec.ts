import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiMobilePaginator } from './ui-mobile-paginator';

describe('UiMobilePaginator', () => {
  let component: UiMobilePaginator;
  let fixture: ComponentFixture<UiMobilePaginator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiMobilePaginator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiMobilePaginator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
