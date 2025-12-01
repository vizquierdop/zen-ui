import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiPageHeader } from '../../../../components/ui-page-header/ui-page-header';
import { OfferedServiceModel } from '../../../../models/entities/offered-service.models';
import { Router } from '@angular/router';
import { UiServiceFull } from '../../../../components/ui-service-full/ui-service-full';
import { UiMobilePaginator } from '../../../../components/ui-mobile-paginator/ui-mobile-paginator';

@Component({
  selector: 'app-public-services-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    UiPageHeader,
    UiServiceFull,
    UiMobilePaginator,
  ],
  templateUrl: './services-list.html',
  styleUrl: './services-list.scss',
})
export class PublicServicesList {
  isLoading = signal<boolean>(false);
  itemsLength = signal<number>(0);
  totalCount = signal<number>(0);
  hasPreviousPage = signal<boolean>(false);
  hasNextPage = signal<boolean>(false);
  services: OfferedServiceModel[] = [
    {
      id: 1,
      name: 'Service 1',
      description: 'Description 1',
      duration: 60,
      price: 100,
      active: true,
      businessId: 1,
      business: {
        id: 1,
        name: 'Business 1',
        address: 'Address 1',
        vacations: [],
        availabilities: [],
        categories: [],
        googleMaps: '',
        phone: '',
        province: {
          id: '1',
          name: 'Province 1',
        },
        provinceId: 1,
        services: [],
        simultaneousBookings: 0,
        userId: 1,
      },
    },
    {
      id: 2,
      name: 'Service 2',
      description: 'Description 2',
      duration: 60,
      price: 100,
      active: true,
      businessId: 1,
      business: {
        id: 2,
        name: 'Business 2',
        address: 'Address 2',
        vacations: [],
        availabilities: [],
        categories: [],
        googleMaps: '',
        phone: '',
        province: {
          id: '2',
          name: 'Province 2',
        },
        provinceId: 2,
        services: [],
        simultaneousBookings: 0,
        userId: 2,
      },
    },
  ];

  constructor(private readonly router: Router) {}

  onSearch(): void {
    // TODO Implement onSearch
  }

  previousPage(): void {
    // TODO Implement previous page method.
  }
  nextPage(): void {
    // TODO Implement next page method.
  }
}
