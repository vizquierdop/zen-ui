import { CommonModule } from '@angular/common';
import { Component, effect, input, output, Signal, WritableSignal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ui-paginator',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './ui-paginator.html',
  styleUrl: './ui-paginator.scss'
})
export class UIPaginator {
  currentPage = input.required<WritableSignal<number>>();
  hasPreviousPage = input.required<boolean>();
  hasNextPage = input.required<boolean>();
  totalPages = input.required<number>();
  totalCount = input.required<number>();
  hasToReload = output<void>();

  currentPageValue = 0;

  constructor() {
    effect(() => {
      const currentPageSignal = this.currentPage();
      this.currentPageValue = currentPageSignal();
    });
  }

  previousPage(): void {
    this.currentPage().update((val) => val - 1);
    this.hasToReload.emit();
  }

  nextPage(): void {
    this.currentPage().update((val) => val + 1);
    this.hasToReload.emit();
  }
}
