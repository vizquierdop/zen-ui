import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminServicesList } from './services-list';

describe('AdminServicesList', () => {
  let component: AdminServicesList;
  let fixture: ComponentFixture<AdminServicesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminServicesList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminServicesList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
