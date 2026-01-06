import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHolidayModal } from './add-holiday-modal';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrService } from 'ngx-toastr';
import { of, throwError } from 'rxjs';
import { HolidaysService } from '../../../../../services/holidays.service';

describe('AddHolidayModal', () => {
  let component: AddHolidayModal;
  let fixture: ComponentFixture<AddHolidayModal>;

  let dialogRefMock: any;
  let holidaysServiceMock: any;
  let toastrServiceMock: any;

  const mockBusinessId = 500;

  beforeEach(async () => {
    dialogRefMock = {
      close: jasmine.createSpy('close'),
    };

    holidaysServiceMock = {
      create: jasmine.createSpy('create').and.returnValue(of({})),
    };

    toastrServiceMock = {
      success: jasmine.createSpy('success'),
      error: jasmine.createSpy('error'),
    };

    await TestBed.configureTestingModule({
      imports: [AddHolidayModal, NoopAnimationsModule],
      providers: [
        DatePipe,
        provideNativeDateAdapter(),
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: HolidaysService, useValue: holidaysServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: { businessId: mockBusinessId },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddHolidayModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with businessId from data', () => {
    expect(component.addHolidaysForm.get('businessId')?.value).toBe(mockBusinessId);
  });

  it('should save holiday successfully', () => {
    const startDate = new Date(2025, 11, 25);
    const endDate = new Date(2025, 11, 26);

    component.addHolidaysForm.patchValue({
      startDate: startDate,
      endDate: endDate
    });

    component.save();

    expect(holidaysServiceMock.create).toHaveBeenCalled();
    const args = holidaysServiceMock.create.calls.mostRecent().args[0];

    expect(args.startDate).toBe('2025-12-25');
    expect(args.endDate).toBe('2025-12-26');
    expect(args.businessId).toBe(mockBusinessId);

    expect(toastrServiceMock.success).toHaveBeenCalled();
    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
    expect(component.isLoading()).toBeFalse();
  });

  it('should handle error on save', () => {
    holidaysServiceMock.create.and.returnValue(throwError(() => new Error('Error')));
    component.addHolidaysForm.patchValue({
      startDate: new Date(),
      endDate: new Date()
    });

    component.save();

    expect(toastrServiceMock.error).toHaveBeenCalled();
    expect(component.isLoading()).toBeFalse();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should close dialog with false on close()', () => {
    component.close();
    expect(dialogRefMock.close).toHaveBeenCalledWith(false);
  });
});
