import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCategoryItem } from './ui-category-item';
import { Router } from '@angular/router';

describe('UiCategoryItem', () => {
  let component: UiCategoryItem;
  let fixture: ComponentFixture<UiCategoryItem>;
  let routerMock: any;

  const mockCategory = {
    id: 123,
    name: 'Hairdresser',
    icon: 'hairdresser',
  };

  beforeEach(async () => {
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    await TestBed.configureTestingModule({
      imports: [UiCategoryItem],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCategoryItem);
    component = fixture.componentInstance;

    component.category = mockCategory as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to businesses page with categoryId on goToCategory', () => {
    component.goToCategory();

    expect(routerMock.navigate).toHaveBeenCalledTimes(1);

    expect(routerMock.navigate).toHaveBeenCalledWith(
      ['public/businesses'], 
      {
        queryParams: { categoryId: 123 }
      }
    );
  });
});
