import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiServiceFull } from './ui-service-full';

describe('UiServiceFull', () => {
  let component: UiServiceFull;
  let fixture: ComponentFixture<UiServiceFull>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiServiceFull]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiServiceFull);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
