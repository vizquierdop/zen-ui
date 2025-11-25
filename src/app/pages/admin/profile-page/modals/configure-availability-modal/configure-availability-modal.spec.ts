import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfigureAvailabilityModal } from './configure-availability-modal';

describe('ConfigureAvailabilityModal', () => {
  let component: ConfigureAvailabilityModal;
  let fixture: ComponentFixture<ConfigureAvailabilityModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfigureAvailabilityModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfigureAvailabilityModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
