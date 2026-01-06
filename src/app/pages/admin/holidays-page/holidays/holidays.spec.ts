import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHolidays } from './holidays';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { HolidaysService } from '../../../../services/holidays.service';
import { UsersService } from '../../../../services/users.service';
import { DatePipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

registerLocaleData(localeEs);

describe('AdminHolidays', () => {
  let component: AdminHolidays;
  let fixture: ComponentFixture<AdminHolidays>;

  let dialogMock: any;
  let holidaysServiceMock: any;
  let usersServiceMock: any;
  let toastrServiceMock: any;

  const mockUser = { businessId: 99 };
  const mockHolidaysResponse = {
    items: [{ id: 1, date: '2025-12-25', name: 'Christmas' }],
  };

  beforeEach(async () => {
    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true),
      }),
    };

    holidaysServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of(mockHolidaysResponse)),
      delete: jasmine.createSpy('delete').and.returnValue(of({})),
    };

    usersServiceMock = {
      user$: of(mockUser),
    };

    toastrServiceMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
    };
    await TestBed.configureTestingModule({
      imports: [AdminHolidays, NoopAnimationsModule],
      providers: [
        DatePipe,
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
        { provide: LOCALE_ID, useValue: 'es-ES' },
        DatePipe,
        { provide: MatDialog, useValue: dialogMock },
        { provide: HolidaysService, useValue: holidaysServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminHolidays);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load holidays on init', () => {
    expect(holidaysServiceMock.getAll).toHaveBeenCalled();
    expect(component.businessId).toBe(99);
    expect(component.holidaysList.length).toBe(1);
  });
});

