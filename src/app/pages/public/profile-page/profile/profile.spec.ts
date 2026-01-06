import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicProfile } from './profile';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProvincesService } from '../../../../services/provinces.service';
import { UsersService } from '../../../../services/users.service';

describe('PublicProfile', () => {
  let component: PublicProfile;
  let fixture: ComponentFixture<PublicProfile>;

  let usersServiceMock: any;
  let provincesServiceMock: any;
  let toastrServiceMock: any;

  const mockUser = {
    id: 10,
    firstName: 'Customer',
    lastName: 'Test',
    phone: '123456789',
    provinceId: 5,
    email: 'test.customer@gmail.com',
  };

  const mockProvinces = [
    { value: 5, label: 'Zaragoza' },
    { value: 6, label: 'Madrid' },
  ];

  beforeEach(async () => {
    usersServiceMock = {
      user$: of(mockUser),

      get: jasmine.createSpy('get').and.returnValue(of(mockUser)),

      setUser: jasmine.createSpy('setUser'),

      update: jasmine.createSpy('update').and.returnValue(of({})),
    };

    provincesServiceMock = {
      getSelectOptions: jasmine.createSpy('getSelectOptions').and.returnValue(of(mockProvinces)),
    };

    toastrServiceMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
    };

    await TestBed.configureTestingModule({
      imports: [PublicProfile, NoopAnimationsModule],
      providers: [
        provideRouter([]), // Por si UiPageHeader usa routerLink
        { provide: UsersService, useValue: usersServiceMock },
        { provide: ProvincesService, useValue: provincesServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with user data', () => {
    expect(usersServiceMock.get).toHaveBeenCalledWith(10);
    
    expect(component.profileForm.get('firstName')?.value).toBe('Customer');
    expect(component.profileForm.get('provinceId')?.value).toBe(5);
  });

  it('should load provinces options', () => {
    expect(provincesServiceMock.getSelectOptions).toHaveBeenCalled();
    expect(component.provinceOptions.length).toBe(2);
  });

  it('should save profile successfully', () => {
    component.profileForm.get('firstName')?.setValue('New Name');

    component.save();

    expect(usersServiceMock.update).toHaveBeenCalled();
    
    const args = usersServiceMock.update.calls.mostRecent().args[0];
    expect(args.firstName).toBe('New Name');

    expect(toastrServiceMock.success).toHaveBeenCalled();
    
    expect(usersServiceMock.get).toHaveBeenCalledTimes(2);
  });
});
