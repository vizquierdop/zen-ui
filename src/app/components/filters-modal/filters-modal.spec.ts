import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersModal } from './filters-modal';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DatePipe } from '@angular/common';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

describe('FiltersModal', () => {
  let component: FiltersModal;
  let fixture: ComponentFixture<FiltersModal>;

  let dialogRefMock: any;

  const mockFiltersList = [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
    },
    {
      name: 'createdAt',
      type: 'range',
      label: 'Creation Date',
    },
    {
      name: 'categories',
      type: 'autoComplete',
      label: 'Categories',
      values: [],
      selectedOptions: [],
    },
  ];

  const mockCurrentFilters = {
    name: 'Name',
  };

  beforeEach(async () => {
    dialogRefMock = {
      close: jasmine.createSpy('close'),
    };

    await TestBed.configureTestingModule({
      imports: [FiltersModal, NoopAnimationsModule],
      providers: [
        DatePipe,
        provideNativeDateAdapter(), // Vital para MatDatepicker
        { provide: MatDialogRef, useValue: dialogRefMock },
        { 
          provide: MAT_DIALOG_DATA, 
          useValue: { 
            filtersList: mockFiltersList,
            currentFilters: mockCurrentFilters
          } 
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should clear filters', () => {
    component.clearFilters();
    expect(component.filtersForm.pristine).toBeTrue();
    const autoCompleteFilter = component.multiSelectFilters().find(f => f.name === 'categories');
    expect(autoCompleteFilter?.selectedOptions).toEqual([]);
  });
});
