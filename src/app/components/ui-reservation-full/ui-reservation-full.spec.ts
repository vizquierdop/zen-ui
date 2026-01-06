import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiReservationFull } from './ui-reservation-full';
import { ReservationStatusType } from '../../models/enums/reservation-status-type.enum';
import { of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ReservationsService } from '../../services/reservations.service';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';

describe('UiReservationFull', () => {
  let component: UiReservationFull;
  let fixture: ComponentFixture<UiReservationFull>;

  let routerMock: any;
  let dialogMock: any;
  let reservationsServiceMock: any;
  let toastrServiceMock: any;

  const mockReservation = {
    id: 123,
    date: new Date(),
    startTime: '10:00',
    endTime: '11:00',
    serviceId: 5,
    status: ReservationStatusType.PENDING,
    service: {
      business: { id: 999 }
    }
  };

  beforeEach(async () => {
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true)
      })
    };

    reservationsServiceMock = {
      update: jasmine.createSpy('update').and.returnValue(of({}))
    };

    toastrServiceMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error')
    };
    
    await TestBed.configureTestingModule({
      imports: [UiReservationFull],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ReservationsService, useValue: reservationsServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock }
      ]
    })
    .overrideComponent(UiReservationFull, {
      remove: { imports: [MatDialogModule] },
      add: { providers: [{ provide: MatDialog, useValue: dialogMock }] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiReservationFull);
    component = fixture.componentInstance;

    component.reservation = mockReservation as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to business page', () => {
    component.viewBusiness();
    expect(routerMock.navigate).toHaveBeenCalledWith(['public/businesses/999']);
  });

  it('should cancel reservation successfully when confirmed', () => {
    spyOn(component.hasToReload$, 'emit');

    component.cancelReservation();

    expect(dialogMock.open).toHaveBeenCalled();

    expect(reservationsServiceMock.update).toHaveBeenCalled();
    const args = reservationsServiceMock.update.calls.mostRecent().args[0];
    expect(args.id).toBe(123);
    expect(args.status).toBe(ReservationStatusType.CANCELLED);

    expect(toastrServiceMock.success).toHaveBeenCalled();
    expect(component.hasToReload$.emit).toHaveBeenCalled();
  });

  it('should NOT cancel if dialog is rejected', () => {
    dialogMock.open.and.returnValue({
      afterClosed: () => of(false)
    });

    spyOn(component.hasToReload$, 'emit');

    component.cancelReservation();

    expect(dialogMock.open).toHaveBeenCalled();
    expect(reservationsServiceMock.update).not.toHaveBeenCalled();
    expect(component.hasToReload$.emit).not.toHaveBeenCalled();
  });

  it('should handle error during cancellation', () => {
    dialogMock.open.and.returnValue({ afterClosed: () => of(true) });
    
    reservationsServiceMock.update.and.returnValue(throwError(() => new Error('Error')));

    spyOn(component.hasToReload$, 'emit');

    component.cancelReservation();

    expect(reservationsServiceMock.update).toHaveBeenCalled();
    expect(toastrServiceMock.error).toHaveBeenCalled();
    expect(component.hasToReload$.emit).not.toHaveBeenCalled();
  });
});
