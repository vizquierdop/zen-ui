import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureAvailabilityModal } from './configure-availability-modal';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AvailabilitiesService } from '../../../../../services/availabilities.service';

describe('ConfigureAvailabilityModal', () => {
  let component: ConfigureAvailabilityModal;
  let fixture: ComponentFixture<ConfigureAvailabilityModal>;

  let dialogRefMock: any;
  let availabilitiesServiceMock: any;
  let toastrServiceMock: any;

  const mockBusinessId = 123;
  const mockAvailabilities = [
    { id: 10, dayOfWeek: 1, isActive: true, slot1Start: '09:00', slot1End: '14:00' },
    { id: 11, dayOfWeek: 0, isActive: false },
  ];

  beforeEach(async () => {
    dialogRefMock = {
      close: jasmine.createSpy('close'),
    };

    availabilitiesServiceMock = {
      updateBulk: jasmine.createSpy('updateBulk').and.returnValue(of({})),
    };

    toastrServiceMock = {
      error: jasmine.createSpy('error'),
    };

    await TestBed.configureTestingModule({
      imports: [ConfigureAvailabilityModal, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: AvailabilitiesService, useValue: availabilitiesServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            businessId: mockBusinessId,
            availabilities: mockAvailabilities,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfigureAvailabilityModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize forms with provided data', () => {
    const mondayVal = component.mondayAvailabilityForm.value;
    expect(mondayVal.isActive).toBeTrue();
    expect(mondayVal.slot1Start).toBe('09:00');
    expect(mondayVal.id).toBe(10);

    const sundayVal = component.sundayAvailabilityForm.value;
    expect(sundayVal.isActive).toBeFalse();

    const tuesdayVal = component.tuesdayAvailabilityForm.value;
    expect(tuesdayVal.isActive).toBeFalse();
    expect(tuesdayVal.slot1Start).toBeNull();
  });

  it('should save all availabilities successfully', () => {
    component.mondayAvailabilityForm.patchValue({ slot1End: '18:00' });

    component.save();

    expect(component.isLoading()).toBeFalse();
    
    expect(availabilitiesServiceMock.updateBulk).toHaveBeenCalled();
    const args = availabilitiesServiceMock.updateBulk.calls.mostRecent().args[0];
    
    expect(args.businessId).toBe(mockBusinessId);
    expect(args.availabilities.length).toBe(7);
    
    const mondayRequest = args.availabilities[0];
    expect(mondayRequest.slot1End).toBe('18:00');

    expect(dialogRefMock.close).toHaveBeenCalled();
  });

  it('should handle error when saving', () => {
    availabilitiesServiceMock.updateBulk.and.returnValue(throwError(() => new Error('Error')));

    component.save();

    expect(component.isLoading()).toBeFalse();
    expect(toastrServiceMock.error).toHaveBeenCalled();
    
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });
});
