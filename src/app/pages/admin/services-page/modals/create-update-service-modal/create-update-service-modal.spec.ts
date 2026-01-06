import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { of } from 'rxjs';

import { CreateUpdateServiceModal } from './create-update-service-modal';
import { OfferedServicesService } from '../../../../../services/offered-services.service';
import { ToastrService } from 'ngx-toastr';

describe('CreateUpdateServiceModal', () => {
  let component: CreateUpdateServiceModal;
  let fixture: ComponentFixture<CreateUpdateServiceModal>;

  beforeEach(async () => {
    const dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);
    const offeredServicesSpy = jasmine.createSpyObj('OfferedServicesService', [
      'create',
      'update',
    ]);
    offeredServicesSpy.create.and.returnValue(of(null));
    offeredServicesSpy.update.and.returnValue(of(null));

    const toastrSpy = jasmine.createSpyObj('ToastrService', ['success', 'error']);

    await TestBed.configureTestingModule({
      imports: [CreateUpdateServiceModal],
      providers: [
        FormBuilder,
        { provide: MatDialogRef, useValue: dialogRefSpy },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            businessId: 1,
            type: 'create',
            service: null,
          },
        },
        { provide: OfferedServicesService, useValue: offeredServicesSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateUpdateServiceModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
