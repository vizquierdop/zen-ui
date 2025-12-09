import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UITableTag } from './ui-table-tag';

describe('UITableTag', () => {
  let component: UITableTag;
  let fixture: ComponentFixture<UITableTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UITableTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UITableTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
