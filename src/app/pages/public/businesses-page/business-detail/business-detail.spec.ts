import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBusinessDetail } from './business-detail';
import { of, throwError } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BusinessesService } from '../../../../services/businesses.service';

describe('PublicBusinessDetail', () => {
  let component: PublicBusinessDetail;
  let fixture: ComponentFixture<PublicBusinessDetail>;

  let businessesServiceMock: any;
  let toastrServiceMock: any;
  
  const activatedRouteMock = {
    snapshot: {
      paramMap: {
        get: (key: string) => '1'
      }
    }
  };

  const mockBusinessData = {
    id: 1,
    name: 'Test Business',
    description: 'Test description',
    categories: [],
    availabilities: []
  };

  beforeEach(async () => {
    businessesServiceMock = {
      get: jasmine.createSpy('get').and.returnValue(of(mockBusinessData))
    };

    toastrServiceMock = {
      error: jasmine.createSpy('error')
    };
    
    await TestBed.configureTestingModule({
      imports: [
        PublicBusinessDetail,
        NoopAnimationsModule
      ],
      providers: [
        provideRouter([]), 
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: BusinessesService, useValue: businessesServiceMock },
        { provide: ToastrService, useValue: toastrServiceMock }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicBusinessDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load business data on init', () => {
    expect(component.businessId).toBe(1);
    expect(businessesServiceMock.get).toHaveBeenCalledWith(1);
    expect(component.business()).toEqual(mockBusinessData as any);
    expect(component.isLoading()).toBeFalse();
  });

  it('should handle error when loading data', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    
    businessesServiceMock.get.and.returnValue(throwError(() => new Error('Error')));
    component.loadData();

    expect(component.isLoading()).toBeFalse();
    expect(toastrServiceMock.error).toHaveBeenCalledWith('Error loading business');
    expect(router.navigate).toHaveBeenCalledWith(['public/businesses']);
  });
});
