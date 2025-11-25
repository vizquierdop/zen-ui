import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCategoryFull } from './ui-category-full';

describe('UiCategoryFull', () => {
  let component: UiCategoryFull;
  let fixture: ComponentFixture<UiCategoryFull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCategoryFull]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCategoryFull);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
