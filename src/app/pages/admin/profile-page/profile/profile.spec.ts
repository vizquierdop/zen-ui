import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminProfile } from './profile';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CategoriesService } from '../../../../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AvailabilitiesService } from '../../../../services/availabilities.service';
import { BusinessesService } from '../../../../services/businesses.service';
import { ProvincesService } from '../../../../services/provinces.service';
import { UsersService } from '../../../../services/users.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('AdminProfile', () => {
  let component: AdminProfile;
  let fixture: ComponentFixture<AdminProfile>;

  let routerMock: any;
  let dialogMock: any;
  let usersServiceMock: any;
  let businessesServiceMock: any;
  let provincesServiceMock: any;
  let categoriesServiceMock: any;
  let availabilitiesServiceMock: any;
  let toastrServiceMock: any;

  const mockUser = {
    id: 1,
    businessId: 100,
    firstName: 'Test',
    lastName: 'Name',
    email: 'test.business@gmail.com',
    phone: '600100200',
  };

  const mockBusiness = {
    id: 100,
    name: 'Test Business',
    photo: '',
    provinceId: 1,
    address: 'Test Address',
    simultaneousBookings: 1,
    description: 'Description',
    categories: [{ id: 10, name: 'Hairdresser' }],
    availabilities: [{ dayOfWeek: 1, isActive: true }],
  };

  beforeEach(async () => {
    routerMock = { navigate: jasmine.createSpy('navigate') };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true),
      }),
    };

    usersServiceMock = {
      user$: of(mockUser),
      update: jasmine.createSpy('update').and.returnValue(of({})),
    };

    businessesServiceMock = {
      get: jasmine.createSpy('get').and.returnValue(of(mockBusiness)),
      update: jasmine.createSpy('update').and.returnValue(of({})),
    };

    provincesServiceMock = {
      getSelectOptions: jasmine
        .createSpy('getSelectOptions')
        .and.returnValue(of([{ value: 1, label: 'Madrid' }])),
    };

    categoriesServiceMock = {
      getSelectOptions: jasmine
        .createSpy('getSelectOptions')
        .and.returnValue(of([{ value: 10, label: 'Hairdresser' }])),
    };

    availabilitiesServiceMock = {};

    toastrServiceMock = {
      info: jasmine.createSpy('info'),
      error: jasmine.createSpy('error'),
      success: jasmine.createSpy('success'),
    };

    await TestBed.configureTestingModule({
      imports: [AdminProfile, NoopAnimationsModule],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: Router, useValue: routerMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: BusinessesService, useValue: businessesServiceMock },
        { provide: ProvincesService, useValue: provincesServiceMock },
        { provide: CategoriesService, useValue: categoriesServiceMock },
        { provide: AvailabilitiesService, useValue: availabilitiesServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with business data', () => {
    expect(businessesServiceMock.get).toHaveBeenCalledWith(100);
    
    expect(component.profileForm.get('businessName')?.value).toBe('Test Business');
    expect(component.profileForm.get('firstName')?.value).toBe('Test');
    
    expect(component.categories.length).toBe(1);
    expect(component.categories.at(0).get('name')?.value).toBe('Hairdresser');
  });

  it('should save data successfully', () => {
    component.save();

    expect(component.isLoading()).toBeFalse();
    expect(businessesServiceMock.update).toHaveBeenCalled();
    expect(usersServiceMock.update).toHaveBeenCalled();
  });
});
