import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiPageHeader } from '../../../../components/ui-page-header/ui-page-header';
import { OfferedServiceModel } from '../../../../models/entities/offered-service.models';
import { Router } from '@angular/router';
import { UiServiceFull } from '../../../../components/ui-service-full/ui-service-full';
import { UiMobilePaginator } from '../../../../components/ui-mobile-paginator/ui-mobile-paginator';
import { OfferedServicesService } from '../../../../services/offered-services.service';
import { OfferedServiceGetAllRequestDTO } from '../../../../models/dtos/offered-service.dto.models';

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
export class PublicServicesList implements AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef = ViewChild('searchInput');
  isLoading = signal<boolean>(false);
  itemsLength = signal<number>(0);
  totalCount = signal<number>(0);
  hasPreviousPage = signal<boolean>(false);
  hasNextPage = signal<boolean>(false);
  currentPage = signal(1);
  services: OfferedServiceModel[] = [];
  // services: OfferedServiceModel[] = [
  //   {
  //     id: 1,
  //     name: 'Service 1',
  //     description: 'Description 1',
  //     duration: 60,
  //     price: 100,
  //     isActive: true,
  //     businessId: 1,
  //     business: {
  //       id: 1,
  //       name: 'Business 1',
  //       address: 'Address 1',
  //       vacations: [],
  //       availabilities: [],
  //       categories: [],
  //       googleMaps: '',
  //       phone: '',
  //       province: {
  //         id: '1',
  //         name: 'Province 1',
  //       },
  //       provinceId: 1,
  //       services: [],
  //       simultaneousBookings: 0,
  //       userId: 1,
  //     },
  //   },
  //   {
  //     id: 2,
  //     name: 'Service 2',
  //     description: 'Description 2',
  //     duration: 60,
  //     price: 100,
  //     isActive: true,
  //     businessId: 1,
  //     business: {
  //       id: 2,
  //       name: 'Business 2',
  //       address: 'Address 2',
  //       vacations: [],
  //       availabilities: [],
  //       categories: [],
  //       googleMaps: '',
  //       phone: '',
  //       province: {
  //         id: '2',
  //         name: 'Province 2',
  //       },
  //       provinceId: 2,
  //       services: [],
  //       simultaneousBookings: 0,
  //       userId: 2,
  //     },
  //   },
  // ];

  constructor(private readonly router: Router, private readonly offeredServicesService: OfferedServicesService) {}

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);
    const request: OfferedServiceGetAllRequestDTO = {
      isActive: true,
      paginationLength: 5,
      paginationSkip: this.currentPage(),
    };
    if (this.searchInput.nativeElement.value) {
      request.search = this.searchInput.nativeElement.value;
    }
    this.offeredServicesService.getAll(request).subscribe((response) => {
      this.services = response.items;
      this.itemsLength.set(response.items.length);
      this.totalCount.set(response.totalCount);
      this.hasNextPage.set(response.hasNextPage);
      this.hasPreviousPage.set(response.hasPreviousPage);
      this.isLoading.set(false);
    });
  }

  onSearch(): void {
    this.currentPage.set(1);
    this.loadData();
  }

  previousPage(): void {
    // TODO Implement previous page method.
  }
  nextPage(): void {
    // TODO Implement next page method.
  }
}
