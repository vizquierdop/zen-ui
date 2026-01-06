import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCreateReservationModal } from './ui-create-reservation-modal';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BusinessesService } from '../../services/businesses.service';
import { ReservationsService } from '../../services/reservations.service';
import { UsersService } from '../../services/users.service';
import { DatePipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';

registerLocaleData(localeEs);

describe('UiCreateReservationModal', () => {
  let component: UiCreateReservationModal;
  let fixture: ComponentFixture<UiCreateReservationModal>;

  let dialogRefMock: any;
  let usersServiceMock: any;
  let reservationsServiceMock: any;
  let businessesServiceMock: any;
  let toastrServiceMock: any;

  const mockServiceData = {
    id: 1,
    businessId: 1,
    name: 'Haircut',
    duration: 30,
    price: 15,
  };

  const mockUser = { id: 1, name: 'Customer Test' };
  const mockBusiness = {
    id: 1,
    availabilities: [],
    holidays: [],
  };

  beforeEach(async () => {
    dialogRefMock = {
      close: jasmine.createSpy('close'),
    };

    usersServiceMock = {
      user$: of(mockUser),
    };

    businessesServiceMock = {
      get: jasmine.createSpy('get').and.returnValue(of(mockBusiness)),
    };

    reservationsServiceMock = {
      create: jasmine.createSpy('create').and.returnValue(of({ success: true })),
    };

    toastrServiceMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
    };

    await TestBed.configureTestingModule({
      imports: [
        UiCreateReservationModal,
        NoopAnimationsModule,
      ],
      providers: [
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
        { provide: LOCALE_ID, useValue: 'es-ES' },
        DatePipe,
        { provide: MatDialogRef, useValue: dialogRefMock },
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: { service: mockServiceData }
        },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: ReservationsService, useValue: reservationsServiceMock },
        { provide: BusinessesService, useValue: businessesServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UiCreateReservationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with service data', () => {
    expect(component.service).toEqual(mockServiceData as any);
    expect(component.reservationForm.get('serviceId')?.value).toBe(mockServiceData.id);
  });
});
