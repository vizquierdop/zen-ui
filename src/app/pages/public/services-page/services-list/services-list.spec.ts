import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicServicesList } from './services-list';

describe('PublicServicesList', () => {
  let component: PublicServicesList;
  let fixture: ComponentFixture<PublicServicesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicServicesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicServicesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
