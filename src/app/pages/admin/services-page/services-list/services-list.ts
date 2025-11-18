import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IListPage } from '../../../../utils/lists/list-page.interface';

@Component({
  selector: 'app-admin-services-list',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './services-list.html',
  styleUrl: './services-list.scss',
})
export class AdminServicesList implements IListPage {
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
