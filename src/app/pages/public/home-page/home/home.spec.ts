import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicHome } from './home';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CategoriesService } from '../../../../services/categories.service';
import { ReservationsService } from '../../../../services/reservations.service';
import { UsersService } from '../../../../services/users.service';
import { DatePipe } from '@angular/common';
import { of } from 'rxjs';

describe('Home', () => {
  let component: PublicHome;
  let fixture: ComponentFixture<PublicHome>;

  let routerMock: any;

  beforeEach(async () => {
    routerMock = { navigate: jasmine.createSpy('navigate') };
    const toastrMock = { error: jasmine.createSpy('error') };
    
    const categoriesServiceMock = { 
      getAll: jasmine.createSpy('getAll').and.returnValue(of({ items: [] })) 
    };
    const reservationsServiceMock = { 
      getAll: jasmine.createSpy('getAll').and.returnValue(of({ items: [] })) 
    };
    const usersServiceMock = { 
      user$: of({ id: 1, name: 'Test' })
    };
    await TestBed.configureTestingModule({
      imports: [PublicHome],
      providers: [
        { provide: Router, useValue: routerMock },
        { provide: ToastrService, useValue: toastrMock },
        { provide: CategoriesService, useValue: categoriesServiceMock },
        { provide: ReservationsService, useValue: reservationsServiceMock },
        { provide: UsersService, useValue: usersServiceMock },
        DatePipe
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Navigation', () => {
    it('should navigate to the correct path when goTo is called', () => {
      const path = 'profile';
      component.goTo(path);

      expect(routerMock.navigate).toHaveBeenCalledWith(['public/profile']);
    });
  });
});
