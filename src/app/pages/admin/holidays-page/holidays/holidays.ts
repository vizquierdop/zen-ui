import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-admin-holidays',
  imports: [CommonModule, MatProgressSpinnerModule, MatIconModule, MatButtonModule],
  templateUrl: './holidays.html',
  styleUrl: './holidays.scss',
})
export class AdminHolidays {
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

  openAddHolidayModal(): void {
    // TODO Implement openAddHolidayModal method.
  }
}
