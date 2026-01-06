import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCategoryModal } from './add-category-modal';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessCategoriesService } from '../../../../../services/business-categories.service';

describe('AddCategoryModal', () => {
  let component: AddCategoryModal;
  let fixture: ComponentFixture<AddCategoryModal>;

  let dialogRefMock: any;
  let businessCategoriesServiceMock: any;

  const mockDialogData = {
    businessId: 100,
    categories: [
      { value: 1, label: 'Beautician' },
      { value: 2, label: 'Hairdresser' },
    ],
  };

  beforeEach(async () => {
    dialogRefMock = {
      close: jasmine.createSpy('close'),
    };

    businessCategoriesServiceMock = {
      create: jasmine.createSpy('create').and.returnValue(of({})),
    };

    await TestBed.configureTestingModule({
      imports: [AddCategoryModal, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefMock },
        { provide: BusinessCategoriesService, useValue: businessCategoriesServiceMock },
        {
          provide: MAT_DIALOG_DATA,
          useValue: mockDialogData,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCategoryModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with injected data', () => {
    expect(component.categoryOptions.length).toBe(2);
    
    expect(component.addCategoryForm.get('businessId')?.value).toBe(100);
  });

  it('should save category successfully', () => {
    component.addCategoryForm.patchValue({
      categoryId: 1
    });

    component.save();

    expect(businessCategoriesServiceMock.create).toHaveBeenCalled();
    const args = businessCategoriesServiceMock.create.calls.mostRecent().args[0];
    
    expect(args.businessId).toBe(100);
    expect(args.categoryId).toBe(1);

    expect(dialogRefMock.close).toHaveBeenCalledWith(true);
    expect(component.isLoading()).toBeFalse();
  });

  it('should handle error on save', () => {
    businessCategoriesServiceMock.create.and.returnValue(throwError(() => new Error('Error')));

    component.addCategoryForm.patchValue({ categoryId: 1 });
    component.save();

    expect(component.isLoading()).toBeFalse();
    expect(dialogRefMock.close).not.toHaveBeenCalled();
  });

  it('should close dialog with null on close()', () => {
    component.close();
    expect(dialogRefMock.close).toHaveBeenCalledWith(null);
  });
});
