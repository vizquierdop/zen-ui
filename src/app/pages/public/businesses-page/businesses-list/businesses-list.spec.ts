import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBusinessesList } from './businesses-list';

describe('PublicBusinessesList', () => {
  let component: PublicBusinessesList;
  let fixture: ComponentFixture<PublicBusinessesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicBusinessesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicBusinessesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
