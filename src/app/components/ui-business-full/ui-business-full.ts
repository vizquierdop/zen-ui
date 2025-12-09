import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { BusinessModel } from '../../models/entities/business.models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { AvailabilityModel } from '../../models/entities/availability.models';

@Component({
  selector: 'app-ui-business-full',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './ui-business-full.html',
  styleUrl: './ui-business-full.scss',
})
export class UiBusinessFull implements OnInit {
  @Input() business!: BusinessModel;
  categoriesText = '';
  openingDaysText = '';

  constructor(private readonly router: Router) {}

  ngOnInit(): void {
    this.getInfoTexts();
  }
  
  getInfoTexts(): void {
    this.categoriesText = this.business.categories
      .map((category) => category.name)
      .join(', ');
    this.openingDaysText = this.business.availabilities
      .filter((availability: AvailabilityModel) => availability.isActive)
      .map((availability: AvailabilityModel) => this.getDayName(availability.dayOfWeek))
      .join(', ');

  }

  viewDetails(): void {
    void this.router.navigate([`public/businesses/${this.business.id}`]);
  }

  getDayName(day: number): string {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[day];
  }
}
