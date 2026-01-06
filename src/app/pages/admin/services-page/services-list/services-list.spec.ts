import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesList } from './services-list';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { OfferedServicesService } from '../../../../services/offered-services.service';
import { PersistentFiltersService } from '../../../../services/persistent-filters.service';
import { UsersService } from '../../../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

describe('AdminServicesList', () => {
  let component: AdminServicesList;
  let fixture: ComponentFixture<AdminServicesList>;

  let dialogMock: any;
  let persistentFiltersServiceMock: any;
  let offeredServicesServiceMock: any;
  let usersServiceMock: any;
  let toastrServiceMock: any;

  const mockUser = { businessId: 55 };
  const mockResponse = {
    items: [],
    totalCount: 10,
    hasNextPage: true,
    hasPreviousPage: false,
    totalPages: 2,
    pageNumber: 1,
  };

  beforeEach(async () => {
    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true),
      }),
    };

    persistentFiltersServiceMock = {
      getSectionFilters: jasmine.createSpy('getSectionFilters').and.returnValue({}),
      getSearchFilter: jasmine.createSpy('getSearchFilter').and.returnValue({ search: '' }),
      setSearchFilter: jasmine.createSpy('setSearchFilter'),
      setSectionFilters: jasmine.createSpy('setSectionFilters'),
    };

    offeredServicesServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of(mockResponse)),
    };

    usersServiceMock = {
      user$: of(mockUser),
    };

    toastrServiceMock = {
      error: jasmine.createSpy('error'),
    };

    await TestBed.configureTestingModule({
      imports: [AdminServicesList, NoopAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: PersistentFiltersService, useValue: persistentFiltersServiceMock },
        { provide: OfferedServicesService, useValue: offeredServicesServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
      ],
    })
    .overrideComponent(AdminServicesList, {
      remove: { imports: [MatDialogModule] },
      add: { providers: [{ provide: MatDialog, useValue: dialogMock }] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminServicesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init using user businessId', () => {
    expect(component.businessId).toBe(55);
    expect(offeredServicesServiceMock.getAll).toHaveBeenCalled();

    const args = offeredServicesServiceMock.getAll.calls.mostRecent().args[0];
    expect(args.businessId).toBe(55);
    expect(args.paginationSkip).toBe(1);
  });

  it('should perform search and reset page', () => {
    component.searchInput.nativeElement.value = 'Haircut';

    component.onSearch();

    expect(component.currentPage()).toBe(1);
    expect(persistentFiltersServiceMock.setSearchFilter).toHaveBeenCalledWith(
      jasmine.any(String),
      'Haircut'
    );

    const args = offeredServicesServiceMock.getAll.calls.mostRecent().args[0];
    expect(args.search).toBe('Haircut');
  });

  it('should open filter dialog', () => {
    component.openFilterDialog();
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should open create modal', () => {
    component.openCreateModal();
    expect(dialogMock.open).toHaveBeenCalled();
    const args = dialogMock.open.calls.mostRecent().args[1];
    expect(args.data.type).toBe('create');
  });

  it('should remove filter and reload', () => {
    component.filters.set({ name: 'test' });

    component.removeFilter('name');

    expect(component.filters()['name']).toBeUndefined();
    expect(component.currentPage()).toBe(1);
    expect(offeredServicesServiceMock.getAll).toHaveBeenCalled();
  });
});
