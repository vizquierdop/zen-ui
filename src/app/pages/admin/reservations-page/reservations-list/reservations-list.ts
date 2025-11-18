import { Component, signal } from '@angular/core';
import { IListPage } from '../../../../utils/lists/list-page.interface';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-admin-reservations-list',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './reservations-list.html',
  styleUrl: './reservations-list.scss',
})
export class AdminReservationsList implements IListPage {
  isLoading = signal(true);

  constructor() {
    this.loadData();
  }

  loadData(): void {
    // TODO Implement loadData method.
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  onSearch(): void {
    // TODO Implement onSearch method.
  }

  openFilterDialog(): void {
    // TODO Implement openFilterDialog method.
  }
  
  removeFilter(): void {
    // TODO Implement removeFilter method.
  }

  openCreateModal(): void {
    // TODO Implement openCreateModal method.
  }
}
