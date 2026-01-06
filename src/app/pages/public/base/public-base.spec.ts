import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBase } from './public-base';
import { of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { provideRouter } from '@angular/router';
import { UsersService } from '../../../services/users.service';

describe('PublicBase', () => {
  let component: PublicBase;
  let fixture: ComponentFixture<PublicBase>;

  let usersServiceMock: any;

  const mockUser = {
    id: 1,
    name: 'Test Customer',
    email: 'test.customer@gmail.com',
  };

  beforeEach(async () => {
    usersServiceMock = {
      user$: of(mockUser),
    };

    await TestBed.configureTestingModule({
      imports: [PublicBase],
      providers: [
        provideRouter([]), 
        { provide: UsersService, useValue: usersServiceMock },
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PublicBase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initialization', () => {
    it('should have the sidebar closed by default', () => {
      expect(component.isOpened).toBeFalse();
    });
  });
});
