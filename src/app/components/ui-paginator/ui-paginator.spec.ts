import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UIPaginator } from './ui-paginator';

describe('UIPaginator', () => {
  let component: UIPaginator;
  let fixture: ComponentFixture<UIPaginator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UIPaginator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UIPaginator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
