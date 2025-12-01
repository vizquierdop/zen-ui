import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UiServiceItem } from './ui-service-item';

describe('UiServiceItem', () => {
  let component: UiServiceItem;
  let fixture: ComponentFixture<UiServiceItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UiServiceItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UiServiceItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
