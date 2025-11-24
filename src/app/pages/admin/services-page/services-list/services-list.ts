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
  ],
  templateUrl: './services-list.html',
  styleUrl: './services-list.scss',
})
export class AdminServicesList implements IListPage, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef = ViewChild('searchInput');

  isLoading = signal(true);

  serviceFilters = ServiceFilters;
  filters: WritableSignal<{ [key: string]: any }> = signal({});
  hasFilters = false;

  constructor(
    private readonly dialog: MatDialog,
    private readonly persistentFiltersService: PersistentFiltersService
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
    this.loadData();
  }

  loadData(): void {
    // TODO Implement loadData method.
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  onSearch(): void {
    this.persistentFiltersService.setSearchFilter(
      UISectionKeysEnum.ADMIN_SERVICES,
      this.searchInput.nativeElement.value
    );
    // TODO reset page
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
        // TODO reset page
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
    // TODO reset page
    this.loadData();
  }

  openCreateModal(): void {
    const dialogRef = this.dialog.open(CreateUpdateServiceModal, {
      data: {
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
}
