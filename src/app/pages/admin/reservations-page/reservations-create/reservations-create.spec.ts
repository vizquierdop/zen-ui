import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminReservationsCreate } from './reservations-create';
import { of, throwError } from 'rxjs';
import { DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EnumService } from '../../../../services/enum.service';
import { OfferedServicesService } from '../../../../services/offered-services.service';
import { ReservationsService } from '../../../../services/reservations.service';
import { UsersService } from '../../../../services/users.service';

describe('AdminReservationsCreate', () => {
  let component: AdminReservationsCreate;
  let fixture: ComponentFixture<AdminReservationsCreate>;

  let reservationsServiceMock: any;
  let offeredServicesServiceMock: any;
  let enumServiceMock: any;
  let usersServiceMock: any;
  let routerMock: any;
  let toastrServiceMock: any;

  const mockUser = { id: 1, businessId: 99 };
  const mockServices = [{ value: 10, label: 'Haircut' }];
  const mockStatusOptions = [{ value: 0, label: 'Pending' }];

  beforeEach(async () => {
    reservationsServiceMock = {
      create: jasmine.createSpy('create').and.returnValue(of({}))
    };

    offeredServicesServiceMock = {
      getSelectOptions: jasmine.createSpy('getSelectOptions').and.returnValue(of(mockServices))
    };

    enumServiceMock = {
      getReservationStatusTypeOptions: jasmine.createSpy('getReservationStatusTypeOptions').and.returnValue(mockStatusOptions)
    };

    usersServiceMock = {
      user$: of(mockUser)
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    toastrServiceMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };

    await TestBed.configureTestingModule({
      imports: [
        AdminReservationsCreate,
        NoopAnimationsModule
      ],
      providers: [
        DatePipe,
        provideNativeDateAdapter(),
        
        { provide: ReservationsService, useValue: reservationsServiceMock },
        { provide: OfferedServicesService, useValue: offeredServicesServiceMock },
        { provide: EnumService, useValue: enumServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminReservationsCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and load options with businessId', () => {
    expect(component.businessId).toBe(99);
    
    expect(offeredServicesServiceMock.getSelectOptions).toHaveBeenCalledWith(99);
    expect(enumServiceMock.getReservationStatusTypeOptions).toHaveBeenCalled();
    
    expect(component.servicesOptions.length).toBe(1);
    expect(component.reservationStatusOptions.length).toBe(1);
  });

  it('should create reservation successfully', () => {
    const testDate = new Date(2025, 11, 25);

    component.reservationForm.patchValue({
      customerName: 'Test Customer',
      customerPhone: '600100200',
      serviceId: 10,
      date: testDate,
      startTime: '10:00',
      endTime: '11:00'
    });

    component.save();

    expect(reservationsServiceMock.create).toHaveBeenCalled();
    const args = reservationsServiceMock.create.calls.mostRecent().args[0];
    
    expect(args.date).toBe('2025-12-25');
    expect(args.customerName).toBe('Test Customer');

    expect(toastrServiceMock.success).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/admin/reservations']);
    expect(component.isLoading()).toBeFalse();
  });

  it('should handle error on create', () => {
    reservationsServiceMock.create.and.returnValue(throwError(() => new Error('Error')));

    component.reservationForm.patchValue({ customerName: 'Test Customer' });
    component.save();

    expect(component.isLoading()).toBeFalse();
    expect(toastrServiceMock.error).toHaveBeenCalled();
    
    expect(routerMock.navigate).not.toHaveBeenCalled();
  });

  it('should navigate back', () => {
    component.goBack();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/admin/reservations']);
  });
});
