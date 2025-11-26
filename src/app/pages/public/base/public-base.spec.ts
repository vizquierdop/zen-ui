import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicBase } from './public-base';

describe('PublicBase', () => {
  let component: PublicBase;
  let fixture: ComponentFixture<PublicBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicBase]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicBase);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
