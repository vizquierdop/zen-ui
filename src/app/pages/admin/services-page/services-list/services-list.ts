import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IListPage } from '../../../../utils/lists/list-page.interface';
import { ServiceFilters } from './services.filters';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PersistentFiltersService } from '../../../../services/persistent-filters.service';
import { UISectionKeysEnum } from '../../../../models/enums/section-keys.enum';
import { FiltersModal } from '../../../../components/filters-modal/filters-modal';
import { MatChipsModule } from '@angular/material/chips';
import { FiltersChipPipe } from '../../../../utils/pipes/filters-chips.pipe';
import { CreateUpdateServiceModal } from '../modals/create-update-service-modal/create-update-service-modal';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { CdkTableModule } from '@angular/cdk/table';
import { UIPaginator } from '../../../../components/ui-paginator/ui-paginator';
import { SERVICES_COLUMNS } from './services.columns';
import { OfferedServiceModel } from '../../../../models/entities/offered-service.models';
import { ObjectDataSource } from '../../../../utils/lists/datasource';
import { UITableTag } from '../../../../components/ui-table-tag/ui-table-tag';
import { OfferedServicesService } from '../../../../services/offered-services.service';
import { UsersService } from '../../../../services/users.service';
import { OfferedServiceGetAllRequestDTO } from '../../../../models/dtos/offered-service.dto.models';
import { delay } from 'rxjs';

@Component({
  selector: 'app-admin-services-list',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    FiltersChipPipe,
    CdkTableModule,
    UIPaginator,
    MatSortModule,
    MatMenuModule,
    UITableTag,
  ],
  templateUrl: './services-list.html',
  styleUrl: './services-list.scss',
})
export class AdminServicesList implements IListPage, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = ViewChild(MatSort);
  @ViewChild('searchInput') searchInput: ElementRef = ViewChild('searchInput');

  displayedColumns: string[] = SERVICES_COLUMNS.map((c) => c.name);
  currentPage = signal(1);
  hasPreviousPage = signal(false);
  hasNextPage = signal(false);
  totalPages = signal(0);
  totalCount = signal(0);

  dataSource = new ObjectDataSource<OfferedServiceModel>();

  isLoading = signal(true);

  serviceFilters = ServiceFilters;
  filters: WritableSignal<{ [key: string]: any }> = signal({});
  hasFilters = false;

  businessId!: number;

  constructor(
    private readonly dialog: MatDialog,
    private readonly persistentFiltersService: PersistentFiltersService,
    private readonly offeredServicesService: OfferedServicesService,
    private usersService: UsersService
  ) {
    if (this.persistentFiltersService.getSectionFilters(UISectionKeysEnum.ADMIN_SERVICES)) {
      this.filters.set(
        this.persistentFiltersService.getSectionFilters(UISectionKeysEnum.ADMIN_SERVICES)
      );
    }

    effect(() => {
      const filtersValue = this.filters();
      this.hasFilters = Object.keys(filtersValue).length > 0;
    });
  }

  ngAfterViewInit(): void {
    if (this.persistentFiltersService.getSearchFilter(UISectionKeysEnum.ADMIN_SERVICES)) {
      this.searchInput.nativeElement.value = this.persistentFiltersService.getSearchFilter(
        UISectionKeysEnum.ADMIN_SERVICES
      )['search'];
    }
    if (this.persistentFiltersService.getSectionFilters(UISectionKeysEnum.ADMIN_SERVICES)) {
      this.filters.set(
        this.persistentFiltersService.getSectionFilters(UISectionKeysEnum.ADMIN_SERVICES)
      );
    }
    this.usersService.user$.subscribe((user) => {
      if (user && user.businessId) {
        this.businessId = user.businessId;
        this.loadData();
      }
    });
  }

  loadData(): void {
    this.isLoading.set(true);
    const request: OfferedServiceGetAllRequestDTO = {
      ...this.filters(),
      paginationLength: 25,
      paginationSkip: this.currentPage(),
      businessId: this.businessId,
      // orderBy: this.sort.active,
      // orderDirection: this.sort.direction === 'asc' ? 0 : 1,
    };

    if (this.searchInput.nativeElement.value) {
      request.search = this.searchInput.nativeElement.value;
    }

    this.offeredServicesService
      .getAll(request)
      .pipe(delay(500))
      .subscribe((response) => {
        this.dataSource.data.next(response.items);
        this.hasPreviousPage.set(response.hasPreviousPage);
        this.hasNextPage.set(response.hasNextPage);
        this.totalPages.set(response.totalPages);
        this.currentPage.set(response.pageNumber);
        this.totalCount.set(response.totalCount);

        this.isLoading.set(false);
      });
  }

  onSearch(): void {
    this.persistentFiltersService.setSearchFilter(
      UISectionKeysEnum.ADMIN_SERVICES,
      this.searchInput.nativeElement.value
    );
    this.currentPage.set(1);
    this.loadData();
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FiltersModal, {
      width: '400px',
      data: {
        filtersList: this.serviceFilters,
        currentFilters: this.filters(),
      },
      maxWidth: '750px',
      minWidth: '750px',
    });

    dialogRef.afterClosed().subscribe((result: { [key: string]: any }) => {
      if (result) {
        Object.keys(result).forEach((key: string) => {
          if (result[key] === null || result[key] === '') {
            delete result[key];
          }
        });
        this.filters.set(result);
        this.persistentFiltersService.setSectionFilters(UISectionKeysEnum.ADMIN_SERVICES, result);
        this.currentPage.set(1);
        this.loadData();
      }
    });
  }

  removeFilter(field: string): void {
    this.filters.update((val: { [key: string]: any }) => {
      const newVal = { ...val };
      delete newVal[field];
      return newVal;
    });
    this.persistentFiltersService.setSectionFilters(
      UISectionKeysEnum.ADMIN_SERVICES,
      this.filters()
    );
    this.currentPage.set(1);
    this.loadData();
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(CreateUpdateServiceModal, {
      data: {
        businessId: this.businessId,
        type: 'create',
        service: null,
      },
      minWidth: '650px',
      maxWidth: '650px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  viewDetails(offeredService: OfferedServiceModel): void {
    const dialogRef = this.dialog.open(CreateUpdateServiceModal, {
      data: {
        businessId: this.businessId,
        type: 'update',
        service: offeredService,
      },
      minWidth: '650px',
      maxWidth: '650px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadData();
      }
    });
  }

  updateStatus(offeredService: OfferedServiceModel): void {}
}
