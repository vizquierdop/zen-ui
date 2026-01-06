import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicServicesList } from './services-list';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { OfferedServicesService } from '../../../../services/offered-services.service';
import { UsersService } from '../../../../services/users.service';

describe('PublicServicesList', () => {
  let component: PublicServicesList;
  let fixture: ComponentFixture<PublicServicesList>;

  let offeredServicesServiceMock: any;
  let usersServiceMock: any;

  const mockUser = { id: 1, provinceId: 20 };

  const mockResponse = {
    items: [],
    totalCount: 10,
    itemsLength: 0,
    hasNextPage: true,
    hasPreviousPage: false,
  };

  beforeEach(async () => {
    offeredServicesServiceMock = {
      getAll: jasmine.createSpy('getAll').and.returnValue(of(mockResponse)),
    };

    usersServiceMock = {
      user$: of(mockUser),
    };

    await TestBed.configureTestingModule({
      imports: [PublicServicesList, NoopAnimationsModule],
      providers: [
        provideRouter([]),
        { provide: OfferedServicesService, useValue: offeredServicesServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicServicesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data using user province on init', () => {
    expect(usersServiceMock.user$).toBeDefined();
    expect(component.user.provinceId).toBe(20);
    
    expect(offeredServicesServiceMock.getAll).toHaveBeenCalled();
    const args = offeredServicesServiceMock.getAll.calls.mostRecent().args[0];
    
    expect(args.provinceId).toBe(20);
    expect(args.isActive).toBeTrue();
  });

  it('should search and reset pagination', () => {
    component.currentPage.set(3);
    
    component.searchInput.nativeElement.value = 'Beautician';

    component.onSearch();

    expect(component.currentPage()).toBe(1);
    
    expect(offeredServicesServiceMock.getAll).toHaveBeenCalled();
    const args = offeredServicesServiceMock.getAll.calls.mostRecent().args[0];
    expect(args.search).toBe('Beautician');
  });

  it('should handle pagination', () => {
    offeredServicesServiceMock.getAll.calls.reset();

    component.nextPage();
    expect(component.currentPage()).toBe(2);
    
    let args = offeredServicesServiceMock.getAll.calls.mostRecent().args[0];
    expect(args.paginationSkip).toBe(2);

    component.previousPage();
    expect(component.currentPage()).toBe(1);
    
    args = offeredServicesServiceMock.getAll.calls.mostRecent().args[0];
    expect(args.paginationSkip).toBe(1);
  });
});
