import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Logout } from './logout';
import { UsersService } from '../../../services/users.service';
import { Router } from '@angular/router';

describe('Logout', () => {
  let component: Logout;
  let fixture: ComponentFixture<Logout>;

  let routerMock: any;
  let usersServiceMock: any;

  beforeEach(async () => {
    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    usersServiceMock = {
      logout: jasmine.createSpy('logout'),
    };
    spyOn(localStorage, 'removeItem');

    await TestBed.configureTestingModule({
      imports: [Logout],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Logout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear local storage, logout from service and navigate to login', () => {
    expect(localStorage.removeItem).toHaveBeenCalledWith('zen_accessToken');
    expect(localStorage.removeItem).toHaveBeenCalledWith('zen_refreshToken');
    expect(localStorage.removeItem).toHaveBeenCalledWith('zen_expireDate');

    expect(usersServiceMock.logout).toHaveBeenCalled();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });
});
