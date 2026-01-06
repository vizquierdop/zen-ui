import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBase } from './admin-base';
import { of } from 'rxjs';
import { UsersService } from '../../../services/users.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, provideRouter, Router } from '@angular/router';

describe('AdminBase', () => {
  let component: AdminBase;
  let fixture: ComponentFixture<AdminBase>;

  let usersServiceMock: any;

  const mockUser = {
    id: 1,
    name: 'Test Business',
    email: 'test.business@gmail.com',
    business: {
      name: 'Test Business'
    }
  };

  beforeEach(async () => {
    usersServiceMock = {
      user$: of(mockUser) 
    };
    
    await TestBed.configureTestingModule({
      imports: [AdminBase],
      providers: [
        provideRouter([]), 
        { provide: UsersService, useValue: usersServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminBase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should set userBusinessName to uppercase', () => {
      expect(component.userBusinessName).toBe('TEST BUSINESS');
      
      expect(component.user).toEqual(mockUser as any);
    });

    it('should have the sidebar opened by default', () => {
      expect(component.isOpened).toBeTrue();
    });
  });
});
