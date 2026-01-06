import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservationsList } from './reservations-list';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { provideRouter } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnumService } from '../../../../services/enum.service';
import { OfferedServicesService } from '../../../../services/offered-services.service';
import { PersistentFiltersService } from '../../../../services/persistent-filters.service';
import { ReservationsService } from '../../../../services/reservations.service';
import { UsersService } from '../../../../services/users.service';

describe('AdminReservationsList', () => {
  let component: AdminReservationsList;
  let fixture: ComponentFixture<AdminReservationsList>;

  let dialogMock: any;
  let persistentFiltersServiceMock: any;
  let reservationsServiceMock: any;
  let usersServiceMock: any;
  let offeredServicesServiceMock: any;
  let enumServiceMock: any;
  let toastrServiceMock: any;

  const mockUser = { businessId: 1 };
  const mockReservationsResponse = {
    items: [],
    totalCount: 0,
    totalPages: 0,
    pageNumber: 1,
    hasPreviousPage: false,
    hasNextPage: false,
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

    reservationsServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of(mockReservationsResponse)),
      update: jasmine.createSpy('update').and.returnValue(of({})),
    };

    usersServiceMock = {
      user$: of(mockUser),
    };

    offeredServicesServiceMock = {
      getSelectOptions: jasmine.createSpy('getSelectOptions').and.returnValue(of([])),
    };

    enumServiceMock = {
      getReservationStatusTypeOptions: jasmine
        .createSpy('getReservationStatusTypeOptions')
        .and.returnValue([]),
    };

    toastrServiceMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
    };

    await TestBed.configureTestingModule({
      imports: [
        AdminReservationsList,
        NoopAnimationsModule,
      ],
      providers: [
        provideRouter([]),
        { provide: MatDialog, useValue: dialogMock },
        { provide: PersistentFiltersService, useValue: persistentFiltersServiceMock },
        { provide: ReservationsService, useValue: reservationsServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: OfferedServicesService, useValue: offeredServicesServiceMock },
        { provide: EnumService, useValue: enumServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminReservationsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data on init if user has businessId', () => {
    expect(reservationsServiceMock.getAll).toHaveBeenCalled();
    expect(component.businessId).toBe(1);
  });
});
