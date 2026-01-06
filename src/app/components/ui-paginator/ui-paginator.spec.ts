import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal, WritableSignal } from '@angular/core';

import { UIPaginator } from './ui-paginator';

describe('UIPaginator', () => {
  let component: UIPaginator;
  let fixture: ComponentFixture<UIPaginator>;
  let currentPageSignal: WritableSignal<number>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UIPaginator],
    }).compileComponents();

    fixture = TestBed.createComponent(UIPaginator);
    component = fixture.componentInstance;

    currentPageSignal = signal(1);
    fixture.componentRef.setInput('currentPage', currentPageSignal);
    fixture.componentRef.setInput('hasPreviousPage', false);
    fixture.componentRef.setInput('hasNextPage', true);
    fixture.componentRef.setInput('totalPages', 5);
    fixture.componentRef.setInput('totalCount', 50);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should go to next and previous page without errors', () => {
    const initial = currentPageSignal();
    component.nextPage();
    expect(currentPageSignal()).toBe(initial + 1);

    component.previousPage();
    expect(currentPageSignal()).toBe(initial);
  });
});
