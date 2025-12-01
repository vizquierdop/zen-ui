import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBusinessDetail } from './business-detail';

describe('PublicBusinessDetail', () => {
  let component: PublicBusinessDetail;
  let fixture: ComponentFixture<PublicBusinessDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicBusinessDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicBusinessDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
