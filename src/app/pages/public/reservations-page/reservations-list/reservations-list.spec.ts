import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicReservationsList } from './reservations-list';
import { of } from 'rxjs';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ReservationsService } from '../../../../services/reservations.service';
import { UsersService } from '../../../../services/users.service';
import { ReservationStatusType } from '../../../../models/enums/reservation-status-type.enum';

describe('PublicReservationsList', () => {
  let component: PublicReservationsList;
  let fixture: ComponentFixture<PublicReservationsList>;

  let reservationsServiceMock: any;
  let usersServiceMock: any;

  const mockUser = { id: 99 };
  const mockResponse = {
    items: [],
    totalCount: 50,
    itemsLength: 0,
    hasNextPage: true,
    hasPreviousPage: false,
    pageNumber: 1
  };

  beforeEach(async () => {
    reservationsServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of(mockResponse))
    };

    usersServiceMock = {
      user$: of(mockUser) 
    };
    
    await TestBed.configureTestingModule({
      imports: [
        PublicReservationsList,
        NoopAnimationsModule 
      ],
      providers: [
        provideRouter([]), 
        provideNativeDateAdapter(),
        { provide: ReservationsService, useValue: reservationsServiceMock },
        { provide: UsersService, useValue: usersServiceMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicReservationsList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load initial data with correct pagination', () => {
    expect(component.userId).toBe(99);
    expect(component.currentPage()).toBe(1);
    
    expect(reservationsServiceMock.getAll).toHaveBeenCalled();
    const args = reservationsServiceMock.getAll.calls.mostRecent().args[0];
    
    expect(args.userId).toBe(99);
    expect(args.paginationSkip).toBe(1);
  });

  it('should handle pagination (next/previous)', () => {
    reservationsServiceMock.getAll.calls.reset();

    component.nextPage();
    expect(component.currentPage()).toBe(2);
    expect(reservationsServiceMock.getAll).toHaveBeenCalled();
    
    let args = reservationsServiceMock.getAll.calls.mostRecent().args[0];
    expect(args.paginationSkip).toBe(2);

    component.previousPage();
    expect(component.currentPage()).toBe(1);
    
    args = reservationsServiceMock.getAll.calls.mostRecent().args[0];
    expect(args.paginationSkip).toBe(1);
  });

  it('should filter by status and reset pagination', () => {
    component.currentPage.set(5);
    reservationsServiceMock.getAll.calls.reset();

    component.updateStatus('pending'); 

    expect(component.pendingFilter()).toBeTrue();
    
    expect(component.currentPage()).toBe(1);

    expect(reservationsServiceMock.getAll).toHaveBeenCalled();
    const args = reservationsServiceMock.getAll.calls.mostRecent().args[0];
    
    expect(args.statusTypes).toContain(ReservationStatusType.ACCEPTED.toString());
    expect(args.statusTypes).toContain(ReservationStatusType.PENDING.toString());
  });

  it('should apply date filters', () => {
    reservationsServiceMock.getAll.calls.reset();

    const start = new Date(2026, 5, 1);
    const end = new Date(2026, 5, 30);
    
    component.filtersForm.patchValue({
      startDate: start,
      endDate: end
    });

    component.loadData();

    const args = reservationsServiceMock.getAll.calls.mostRecent().args[0];
    expect(args.startDate).toBe(start);
    expect(args.endDate).toBe(end);
  });

  it('should update button styles via effect', () => {
    expect(component.acceptedButtonType()).toBe('filled');
    expect(component.cancelledButtonType()).toBe('outlined');

    component.cancelledFilter.set(true);
    
    fixture.detectChanges(); 

    expect(component.cancelledButtonType()).toBe('filled');
  });
});
