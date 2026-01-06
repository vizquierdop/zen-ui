import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Login } from './login';
import { RoleType } from '../../../models/enums/role.enum';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { UsersService } from '../../../services/users.service';

describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;

  let authServiceMock: any;
  let usersServiceMock: any;
  let routerMock: any;
  let toastrServiceMock: any;

  const mockLoginResponse = {
    accessToken: 'test-access-token',
    refreshToken: 'test-refresh-token',
    accessTokenExpiresAt: new Date().toISOString(),
    userId: 100
  };

  const mockUserBusiness = {
    id: 100,
    role: RoleType.BUSINESS,
    firstName: 'Test Business',
    businessId: 50
  };

  const mockUserCustomer = {
    id: 101,
    role: RoleType.CUSTOMER,
    firstName: 'Test Customer'
  };

  beforeEach(async () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(localStorage, 'setItem');

    authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of(mockLoginResponse))
    };

    usersServiceMock = {
      get: jasmine.createSpy('get').and.returnValue(of(mockUserBusiness)),
      setUser: jasmine.createSpy('setUser')
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    toastrServiceMock = {
      error: jasmine.createSpy('error')
    };

    await TestBed.configureTestingModule({
      imports: [Login, NoopAnimationsModule],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate form fields', () => {
    const emailControl = component.loginForm.get('email');
    const passControl = component.loginForm.get('password');

    expect(component.loginForm.valid).toBeFalse();

    emailControl?.setValue('notemail.com');
    expect(emailControl?.valid).toBeFalse();

    emailControl?.setValue('test.customer@gmail.com');
    passControl?.setValue('Pa$$w0rd');
    expect(component.loginForm.valid).toBeTrue();
  });

  it('should login successfully as BUSINESS and navigate to admin profile', () => {
    component.loginForm.patchValue({ email: 'test.business@gmail.com', password: 'Pa$$w0rd' });

    component.login();

    expect(component.isLoading()).toBeFalse();
    
    expect(authServiceMock.login).toHaveBeenCalled();
    
    expect(localStorage.setItem).toHaveBeenCalledWith('zen_accessToken', 'test-access-token');
    
    expect(usersServiceMock.get).toHaveBeenCalledWith(100);
    expect(usersServiceMock.setUser).toHaveBeenCalledWith(mockUserBusiness);

    expect(routerMock.navigate).toHaveBeenCalledWith(['/admin/profile']);
  });

  it('should login successfully as CUSTOMER and navigate to home', () => {
    usersServiceMock.get.and.returnValue(of(mockUserCustomer));
    
    component.loginForm.patchValue({ email: 'test.customer@gmail.com', password: 'Pa$$w0rd' });
    component.login();

    expect(usersServiceMock.setUser).toHaveBeenCalledWith(mockUserCustomer);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/public/home']);
  });

  it('should handle login error', () => {
    authServiceMock.login.and.returnValue(throwError(() => new Error('Wrong credentials')));

    component.loginForm.patchValue({ email: 'test.error@gmail.com', password: 'Pa$$w0rd' });
    component.login();

    expect(component.isLoading()).toBeFalse();
    expect(toastrServiceMock.error).toHaveBeenCalledWith('Error, check your credentials.');

    expect(usersServiceMock.get).not.toHaveBeenCalled();
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });
});
