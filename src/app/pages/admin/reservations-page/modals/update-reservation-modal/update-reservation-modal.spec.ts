import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateReservationModal } from './update-reservation-modal';
import { of, throwError } from 'rxjs';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { EnumService } from '../../../../../services/enum.service';
import { OfferedServicesService } from '../../../../../services/offered-services.service';
import { ReservationsService } from '../../../../../services/reservations.service';

describe('UpdateReservationModal', () => {
  let component: UpdateReservationModal;
  let fixture: ComponentFixture<UpdateReservationModal>;

  let dialogRefMock: any;
  let reservationsServiceMock: any;
  let offeredServicesServiceMock: any;
  let enumServiceMock: any;
  let toastrServiceMock: any;

  const mockReservation = {
    id: 1,
    serviceId: 10,
    status: 0,
    date: new Date(),
    startTime: '10:00',
    endTime: '11:00',
    userId: null,
    customerName: 'Test Customer',
    customerEmail: 'test.cusotmer@gmail.com',
    customerPhone: '600100200',
  };

  const mockBusinessId = 55;
  const mockOfferedServices = [{ value: 10, label: 'Haircut' }];
  const mockStatusOptions = [{ value: 0, label: 'Pending' }];

  beforeEach(async () => {
    dialogRefMock = {
      close: jasmine.createSpy('close'),
    };

    reservationsServiceMock = {
      update: jasmine.createSpy('update').and.returnValue(of({})),
    };

    offeredServicesServiceMock = {
      getSelectOptions: jasmine
        .createSpy('getSelectOptions')
        .and.returnValue(of(mockOfferedServices)),
    };

    enumServiceMock = {
      getReservationStatusTypeOptions: jasmine
        .createSpy('getReservationStatusTypeOptions')
        .and.returnValue(mockStatusOptions),
    };

    toastrServiceMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
    };

    await TestBed.configureTestingModule({
      imports: [
        UpdateReservationModal,
        NoopAnimationsModule,
      ],
      providers: [
        provideNativeDateAdapter(),        
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: ReservationsService, useValue: reservationsServiceMock },
        { provide: OfferedServicesService, useValue: offeredServicesServiceMock },
        { provide: EnumService, useValue: enumServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            reservation: mockReservation,
            businessId: mockBusinessId
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateReservationModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and load options', () => {
    expect(offeredServicesServiceMock.getSelectOptions).toHaveBeenCalledWith(mockBusinessId);
    expect(enumServiceMock.getReservationStatusTypeOptions).toHaveBeenCalled();
    expect(component.offeredServiceOptions.length).toBe(1);

    expect(component.reservationForm.get('customerName')?.value).toBe('Test Customer');
    expect(component.reservationForm.get('serviceId')?.value).toBe(10);
    
    expect(component.reservationForm.get('customerName')?.enabled).toBeTrue();
  });

  it('should save update successfully', () => {
    component.reservationForm.patchValue({
      customerName: 'New Customer Name',
      status: 1
    });

    component.save();

    expect(reservationsServiceMock.update).toHaveBeenCalled();
    const args = reservationsServiceMock.update.calls.mostRecent().args[0];

    expect(args.id).toBe(1);
    expect(args.customerName).toBe('New Customer Name');
    expect(args.status).toBe(1);

    expect(toastrServiceMock.success).toHaveBeenCalled();
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
    expect(component.isLoading()).toBeFalse();
  });

  it('should handle error on save', () => {
    reservationsServiceMock.update.and.returnValue(throwError(() => new Error('Error')));

    component.save();

    expect(component.isLoading()).toBeFalse();
    expect(toastrServiceMock.error).toHaveBeenCalled();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should close dialog with null on close()', () => {
    component.close();
    expect(dialogRefMock.close).toHaveBeenCalledWith(null);
  });
});
