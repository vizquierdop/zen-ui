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
import { UsersService } from '../../../../services/users.service';
import { UserModel } from '../../../../models/entities/user.models';

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

  user!: UserModel;
  
  constructor(private readonly router: Router, private readonly offeredServicesService: OfferedServicesService, private readonly usersService: UsersService) {}

  ngAfterViewInit(): void {
    this.usersService.user$.subscribe((user) => {
      this.user = user!;
      this.loadData();
    });
  }

  loadData(): void {
    this.isLoading.set(true);
    const request: OfferedServiceGetAllRequestDTO = {
      isActive: true,
      provinceId: this.user.provinceId,
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
    this.currentPage.update((val) => val - 1);
    this.loadData();
  }
  nextPage(): void {
    this.currentPage.update((val) => val + 1);
    this.loadData();
  }
}
