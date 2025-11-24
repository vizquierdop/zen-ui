import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUpdateServiceModal } from './create-update-service-modal';

describe('CreateUpdateServiceModal', () => {
  let component: CreateUpdateServiceModal;
  let fixture: ComponentFixture<CreateUpdateServiceModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUpdateServiceModal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUpdateServiceModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
