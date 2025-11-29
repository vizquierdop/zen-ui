import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicCategoriesList } from './categories-list';

describe('PublicCategoriesList', () => {
  let component: PublicCategoriesList;
  let fixture: ComponentFixture<PublicCategoriesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicCategoriesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicCategoriesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
