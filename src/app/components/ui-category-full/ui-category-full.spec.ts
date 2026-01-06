import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiCategoryFull } from './ui-category-full';
import { of, throwError } from 'rxjs';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { BusinessCategoriesService } from '../../services/business-categories.service';

describe('UiCategoryFull', () => {
  let component: UiCategoryFull;
  let fixture: ComponentFixture<UiCategoryFull>;

  let dialogMock: any;
  let businessCategoriesServiceMock: any;
  let toastrServiceMock: any;

  const mockCategory = { id: 10, name: 'Hairdresser' };
  const mockBusinessId = 500;

  beforeEach(async () => {
    dialogMock = {
      open: jasmine.createSpy('open').and.returnValue({
        afterClosed: () => of(true),
      }),
    };

    businessCategoriesServiceMock = {
      delete: jasmine.createSpy('delete').and.returnValue(of({})),
    };

    toastrServiceMock = {
      error: jasmine.createSpy('error'),
    };

    await TestBed.configureTestingModule({
      imports: [UiCategoryFull],
      providers: [
        { provide: BusinessCategoriesService, useValue: businessCategoriesServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock },
        { provide: MatDialog, useValue: dialogMock }
      ]
    })
    .overrideComponent(UiCategoryFull, {
      remove: { imports: [MatDialogModule] },
      add: { providers: [{ provide: MatDialog, useValue: dialogMock }] }
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiCategoryFull);
    component = fixture.componentInstance;

    component.category = mockCategory as any;
    component.businessId = mockBusinessId;
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open confirmation modal and delete category if confirmed', () => {
    spyOn(component.hasToReload$, 'emit');

    component.openConfirmationModal();

    expect(dialogMock.open).toHaveBeenCalled();
    
    expect(businessCategoriesServiceMock.delete).toHaveBeenCalledWith(mockBusinessId, mockCategory.id);
    
    expect(component.hasToReload$.emit).toHaveBeenCalled();
  });

  it('should NOT delete category if confirmation is cancelled', () => {
    dialogMock.open.and.returnValue({
      afterClosed: () => of(false)
    });
    
    spyOn(component.hasToReload$, 'emit');

    component.openConfirmationModal();

    expect(dialogMock.open).toHaveBeenCalled();
    
    expect(businessCategoriesServiceMock.delete).not.toHaveBeenCalled();
    
    expect(component.hasToReload$.emit).not.toHaveBeenCalled();
  });

  it('should handle error during deletion', () => {
    dialogMock.open.and.returnValue({
      afterClosed: () => of(true)
    });

    businessCategoriesServiceMock.delete.and.returnValue(throwError(() => new Error('Error')));
    
    spyOn(component.hasToReload$, 'emit');

    component.openConfirmationModal();

    expect(businessCategoriesServiceMock.delete).toHaveBeenCalled();
    
    expect(toastrServiceMock.error).toHaveBeenCalled();
    
    expect(component.hasToReload$.emit).not.toHaveBeenCalled();
  });
});
