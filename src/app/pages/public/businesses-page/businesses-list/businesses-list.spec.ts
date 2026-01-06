import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { PublicBusinessesList } from './businesses-list';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, provideRouter } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusinessesService } from '../../../../services/businesses.service';
import { CategoriesService } from '../../../../services/categories.service';
import { UsersService } from '../../../../services/users.service';

describe('PublicBusinessesList', () => {
  let component: PublicBusinessesList;
  let fixture: ComponentFixture<PublicBusinessesList>;

  let businessesServiceMock: any;
  let categoriesServiceMock: any;
  let usersServiceMock: any;
  let toastrServiceMock: any;

  const activatedRouteMock = {
    snapshot: {
      queryParamMap: {
        get: jasmine.createSpy('get').and.returnValue(null),
      },
    },
  };

  const mockUser = { id: 1, provinceId: 10 };
  const mockCategories = [{ value: 1, label: 'Beautician' }];
  const mockResponse = {
    items: [],
    totalCount: 0,
    itemsLength: 0,
    hasNextPage: false,
    hasPreviousPage: false,
    pageNumber: 1,
  };

  beforeEach(async () => {
    businessesServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of(mockResponse)),
    };

    categoriesServiceMock = {
      getSelectOptions: jasmine.createSpy('getSelectOptions').and.returnValue(of(mockCategories)),
    };

    usersServiceMock = {
      user$: of(mockUser),
    };

    toastrServiceMock = {
      error: jasmine.createSpy('error'),
    };

    await TestBed.configureTestingModule({
      imports: [PublicBusinessesList, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: BusinessesService, useValue: businessesServiceMock },
        { provide: CategoriesService, useValue: categoriesServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicBusinessesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial data using user province', () => {
    expect(categoriesServiceMock.getSelectOptions).toHaveBeenCalled();
    expect(businessesServiceMock.getAll).toHaveBeenCalled();
    
    const requestArgs = businessesServiceMock.getAll.calls.mostRecent().args[0];
    expect(requestArgs.provinceId).toBe(10);
  });

  it('should reload data when filters change', fakeAsync(() => {
    const nameControl = component.filtersForm.get('name');
    nameControl?.setValue('New filter');

    tick(); 

    expect(businessesServiceMock.getAll).toHaveBeenCalledTimes(2);
    
    const requestArgs = businessesServiceMock.getAll.calls.mostRecent().args[0];
    expect(requestArgs.name).toBe('New filter');
  }));

  it('should handle pagination', () => {
    component.nextPage();
    expect(component.currentPage()).toBe(2);
    expect(businessesServiceMock.getAll).toHaveBeenCalled();

    component.previousPage();
    expect(component.currentPage()).toBe(1);
  });
});
