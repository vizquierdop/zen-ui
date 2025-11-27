import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCategoryItem } from './ui-category-item';

describe('UiCategoryItem', () => {
  let component: UiCategoryItem;
  let fixture: ComponentFixture<UiCategoryItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiCategoryItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCategoryItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
