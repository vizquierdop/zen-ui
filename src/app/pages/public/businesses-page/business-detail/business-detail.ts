import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiPageHeader } from '../../../../components/ui-page-header/ui-page-header';
import { MatDialogModule } from '@angular/material/dialog';
import { UiCategoryItem } from '../../../../components/ui-category-item/ui-category-item';
import { BusinessModel } from '../../../../models/entities/business.models';
import { ActivatedRoute } from '@angular/router';
import { UiServiceItem } from "../../../../components/ui-service-item/ui-service-item";

@Component({
  selector: 'app-public-business-detail',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    UiPageHeader,
    MatDialogModule,
    UiCategoryItem,
    UiServiceItem
],
  templateUrl: './business-detail.html',
  styleUrl: './business-detail.scss',
})
export class PublicBusinessDetail {
  isLoading = signal<boolean>(false);
  business = signal<BusinessModel | null>(null);

  constructor(private readonly route: ActivatedRoute) {
    this.business.set({
      id: 1,
      name: 'Business 1',
      address: 'Av. Navarra, 3, Zaragoza',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      vacations: [],
      availabilities: [],
      categories: [
        {
          id: '1',
          name: 'Hairdresser',
        },
        {
          id: '2',
          name: 'Beautician',
        },
      ],
      googleMaps: '',
      phone: '976001122',
      province: {
        id: '1',
        name: 'Province 1',
      },
      provinceId: 1,
      services: [
        {
          id: 1,
          name: 'Service 1',
          description: 'Description 1',
          duration: 60,
          price: 100,
          isActive: true,
          businessId: 1,
        },
        {
          id: 2,
          name: 'Service 2',
          description: 'Description 2',
          duration: 30,
          price: 50,
          isActive: true,
          businessId: 1,
        },
      ],
      simultaneousBookings: 0,
      userId: 1,
    });
  }
}
