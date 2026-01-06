import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Register } from './register';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BreakpointObserver } from '@angular/cdk/layout';
import { provideRouter } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../../services/categories.service';
import { ProvincesService } from '../../../services/provinces.service';
import { UsersService } from '../../../services/users.service';

describe('Register', () => {
  let component: Register;
  let fixture: ComponentFixture<Register>;

  let usersServiceMock: any;
  let categoriesServiceMock: any;
  let provincesServiceMock: any;
  let toastrServiceMock: any;
  let breakpointObserverMock: any;

  const mockProvinces = [{ value: 1, label: 'Zaragoza' }];
  const mockCategories = [{ value: 10, label: 'Hairdresser' }];

  beforeEach(async () => {
    usersServiceMock = {
      register: jasmine.createSpy('register').and.returnValue(of({})),
    };

    categoriesServiceMock = {
      getSelectOptions: jasmine.createSpy('getSelectOptions').and.returnValue(of(mockCategories)),
    };

    provincesServiceMock = {
      getSelectOptions: jasmine.createSpy('getSelectOptions').and.returnValue(of(mockProvinces)),
    };

    toastrServiceMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
    };

    breakpointObserverMock = {
      observe: jasmine.createSpy('observe').and.returnValue(of({ matches: false })),
      isMatched: jasmine.createSpy('isMatched').and.returnValue(false),
    };

    await TestBed.configureTestingModule({
      imports: [Register, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: UsersService, useValue: usersServiceMock },
        { provide: CategoriesService, useValue: categoriesServiceMock },
        { provide: ProvincesService, useValue: provincesServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: BreakpointObserver, useValue: breakpointObserverMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Register);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load select options on init', () => {
    expect(provincesServiceMock.getSelectOptions).toHaveBeenCalled();
    expect(categoriesServiceMock.getSelectOptions).toHaveBeenCalled();
    
    expect(component.provinceOptions.length).toBe(1);
    expect(component.categoryOptions.length).toBe(1);
  });

  it('should validate password complexity', () => {
    component.registerForm.patchValue({ password: '123' });
    component.register();
    expect(toastrServiceMock.error).toHaveBeenCalledWith(jasmine.stringMatching(/Password must be/));
    
    expect(usersServiceMock.register).not.toHaveBeenCalled();
  });

  it('should register successfully with valid data', () => {
    component.registerForm.patchValue({
      name: 'Test',
      surname: 'User',
      provinceId: 1,
      email: 'test@test.com',
      password: 'Password123$',
      phone: '123456789'
    });

    component.register();

    expect(usersServiceMock.register).toHaveBeenCalled();
    expect(toastrServiceMock.success).toHaveBeenCalled();
  });

  it('should change validators when userType changes to business', () => {
    const businessNameControl = component.registerForm.get('businessName');
    expect(businessNameControl?.validator).toBeNull();

    component.userType.set('business');
    
    fixture.detectChanges();

    expect(businessNameControl?.hasValidator).toBeDefined();
    
    businessNameControl?.setValue(null);
    expect(businessNameControl?.valid).toBeFalse();
  });
});
