import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-ui-mobile-paginator',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './ui-mobile-paginator.html',
  styleUrl: './ui-mobile-paginator.scss',
})
export class UiMobilePaginator {
  @Input() itemsLength = signal<number>(0);
  @Input() totalCount = signal<number>(0);
  @Input() hasPreviousPage = signal<boolean>(false);
  @Input() hasNextPage = signal<boolean>(false);

  @Output() previousPage$ = new EventEmitter<void>();
  @Output() nextPage$ = new EventEmitter<void>();
}
