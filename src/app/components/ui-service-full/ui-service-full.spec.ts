import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiServiceFull } from './ui-service-full';
import { of } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UiCreateReservationModal } from '../ui-create-reservation-modal/ui-create-reservation-modal';
import { UsersService } from '../../services/users.service';
import { ToastrService } from 'ngx-toastr';
import { BusinessesService } from '../../services/businesses.service';
import { ReservationsService } from '../../services/reservations.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DatePipe, registerLocaleData } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import localeEs from '@angular/common/locales/es';
import { provideNativeDateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

registerLocaleData(localeEs);


describe('UiServiceFull', () => {
  let component: UiServiceFull;
  let fixture: ComponentFixture<UiServiceFull>;

  let dialogMock: any;

  const mockService = {
    id: 1,
    name: 'Haircut',
    description: 'Description..',
    price: 50,
    duration: 60,
    businessId: 1,
    business: { name: 'Test Business', address: 'Test Address' },
  };

  beforeEach(async () => {
    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true),
      }),
    };

    const usersServiceMock = {
      get: jasmine.createSpy('get').and.returnValue(of({})),
      user$: of({ id: 1, name: 'Test' }),
    };

    const toastrMock = { error: () => {}, success: () => {} };
    const genericServiceMock = { get: () => of({}), create: () => of({}) };

    await TestBed.configureTestingModule({
      imports: [UiServiceFull, NoopAnimationsModule],
      providers: [
        provideNativeDateAdapter(),
        { provide: MAT_DATE_LOCALE, useValue: 'es-ES' },
        { provide: LOCALE_ID, useValue: 'es-ES' },
        DatePipe,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MatDialog, useValue: dialogMock },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: ToastrService, useValue: toastrMock },
        { provide: ReservationsService, useValue: genericServiceMock },
        { provide: BusinessesService, useValue: genericServiceMock },
      ],
      
    })
    .overrideComponent(UiServiceFull, {
      remove: { imports: [MatDialogModule] },
      add: { providers: [{ provide: MatDialog, useValue: dialogMock }] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiServiceFull);
    component = fixture.componentInstance;

    component.service = mockService as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open reservation modal with correct data', () => {
    component.openCreateReservationModal();

    expect(dialogMock.open).toHaveBeenCalledTimes(1);
    expect(dialogMock.open).toHaveBeenCalledWith(UiCreateReservationModal, {
      data: {
        service: mockService,
      },
    });
  });
});
