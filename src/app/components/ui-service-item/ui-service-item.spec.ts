import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiServiceItem } from './ui-service-item';
import { of } from 'rxjs';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { UiCreateReservationModal } from '../ui-create-reservation-modal/ui-create-reservation-modal';

describe('UiServiceItem', () => {
  let component: UiServiceItem;
  let fixture: ComponentFixture<UiServiceItem>;

  let dialogMock: any;

  const mockService = {
    id: 10,
    name: 'Haircut',
    price: 50,
    duration: 60,
  };

  beforeEach(async () => {
    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true),
      }),
    };

    await TestBed.configureTestingModule({
      imports: [UiServiceItem],
    })
    .overrideComponent(UiServiceItem, {
      remove: { imports: [MatDialogModule] },
      add: { providers: [{ provide: MatDialog, useValue: dialogMock }] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiServiceItem);
    component = fixture.componentInstance;

    component.service = mockService as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open CreateReservationModal with the correct service data', () => {

    component.openCreateReservationModal();

    expect(dialogMock.open).toHaveBeenCalled();

    expect(dialogMock.open).toHaveBeenCalledWith(UiCreateReservationModal, {
      data: {
        service: mockService
      }
    });
  });
});
