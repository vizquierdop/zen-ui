import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiBusinessFull } from './ui-business-full';
import { Router } from '@angular/router';

describe('UiBusinessFull', () => {
  let component: UiBusinessFull;
  let fixture: ComponentFixture<UiBusinessFull>;
  let routerMock: any;

  const mockBusiness = {
    id: 1,
    name: 'Test Business',
    categories: [
      { id: 1, name: 'Beautician' }, 
      { id: 2, name: 'Hairdresser' }
    ],
    availabilities: [
      { dayOfWeek: 1, isActive: true },
      { dayOfWeek: 2, isActive: false }
    ]
  };

  beforeEach(async () => {
    routerMock = { navigate: jasmine.createSpy('navigate') };

    await TestBed.configureTestingModule({
      imports: [UiBusinessFull],
      providers: [
        { provide: Router, useValue: routerMock }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiBusinessFull);
    component = fixture.componentInstance;

    component.business = mockBusiness as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format info texts correctly on init', () => {
    expect(component.categoriesText).toBe('Beautician, Hairdresser');
    expect(component.openingDaysText).toBe('Mon');
  });

  it('should navigate to details on viewDetails', () => {
    component.viewDetails();
    expect(routerMock.navigate).toHaveBeenCalledWith(['public/businesses/1']);
  });
});
