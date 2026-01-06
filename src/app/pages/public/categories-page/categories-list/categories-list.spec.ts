import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCategoriesList } from './categories-list';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../../../services/categories.service';

describe('PublicCategoriesList', () => {
  let component: PublicCategoriesList;
  let fixture: ComponentFixture<PublicCategoriesList>;

  let categoriesServiceMock: any;
  let toastrServiceMock: any;

  const mockCategoriesResponse = {
    items: [
      { id: 1, name: 'Beautician' },
      { id: 2, name: 'Hairdresser' },
    ],
    totalCount: 2,
  };

  beforeEach(async () => {
    categoriesServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of(mockCategoriesResponse)),
    };

    toastrServiceMock = {
      error: jasmine.createSpy('error'),
    };

    await TestBed.configureTestingModule({
      imports: [PublicCategoriesList, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: CategoriesService, useValue: categoriesServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicCategoriesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories on init', () => {
    expect(categoriesServiceMock.getAll).toHaveBeenCalled();
    expect(component.categories.length).toBe(2);
    expect(component.categories[0].name).toBe('Beautician');
  });

  it('should search when onSearch is called', () => {
    component.searchInput.nativeElement.value = 'Fashion';

    component.onSearch();

    expect(categoriesServiceMock.getAll).toHaveBeenCalled();
    
    const requestArgs = categoriesServiceMock.getAll.calls.mostRecent().args[0];
    expect(requestArgs.search).toBe('Fashion');
  });
});
