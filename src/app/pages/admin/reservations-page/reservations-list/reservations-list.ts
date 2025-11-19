import {
  AfterViewInit,
  Component,
  effect,
  ElementRef,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { IListPage } from '../../../../utils/lists/list-page.interface';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { FiltersChipPipe } from '../../../../utils/pipes/filters-chips.pipe';
import { ReservationFilters } from './reservations.filters';
import { PersistentFiltersService } from '../../../../services/persistent-filters.service';
import { UISectionKeysEnum } from '../../../../models/enums/section-keys.enum';
import { UIFilterModel } from '../../../../models/basic/ui-filter.model';
import { FiltersModal } from '../../../../components/filters-modal/filters-modal';

@Component({
  selector: 'app-admin-reservations-list',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatChipsModule,
    DatePipe,
    FiltersChipPipe,
  ],
  templateUrl: './reservations-list.html',
  styleUrl: './reservations-list.scss',
})
export class AdminReservationsList implements IListPage, AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef = ViewChild('searchInput');

  isLoading = signal(true);

  reservationFilters = ReservationFilters;
  filters: WritableSignal<{ [key: string]: any }> = signal({});
  hasFilters = false;

  constructor(
    private readonly dialog: MatDialog,
    private readonly persistentFiltersService: PersistentFiltersService
  ) {
    if (this.persistentFiltersService.getSectionFilters(UISectionKeysEnum.ADMIN_RESERVATIONS)) {
      this.filters.set(
        this.persistentFiltersService.getSectionFilters(UISectionKeysEnum.ADMIN_RESERVATIONS)
      );
    }

    this.loadFilterSelectValues();
    effect(() => {
      const filtersValue = this.filters();
      this.hasFilters = Object.keys(filtersValue).length > 0;
    });
  }

  ngAfterViewInit(): void {
    if (this.persistentFiltersService.getSearchFilter(UISectionKeysEnum.ADMIN_RESERVATIONS)) {
      this.searchInput.nativeElement.value = this.persistentFiltersService.getSearchFilter(
        UISectionKeysEnum.ADMIN_RESERVATIONS
      )['search'];
    }
    if (this.persistentFiltersService.getSectionFilters(UISectionKeysEnum.ADMIN_RESERVATIONS)) {
      this.filters.set(
        this.persistentFiltersService.getSectionFilters(UISectionKeysEnum.ADMIN_RESERVATIONS)
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
      UISectionKeysEnum.ADMIN_RESERVATIONS,
      this.searchInput.nativeElement.value
    );
    // TODO reset page
    this.loadData();
  }

  openFilterDialog(): void {
    const dialogRef = this.dialog.open(FiltersModal, {
          width: '400px',
          data: {
            filtersList: this.reservationFilters,
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
            this.persistentFiltersService.setSectionFilters(UISectionKeysEnum.ADMIN_RESERVATIONS, result);
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
      UISectionKeysEnum.ADMIN_RESERVATIONS,
      this.filters()
    );
    // TODO reset page
    this.loadData();
  }

  openCreateModal(): void {
    // TODO Implement openCreateModal method.
  }

  loadFilterSelectValues(): void {
    this.reservationFilters.map((f: UIFilterModel) => {
      if (f.values) f.values = [];
      return f;
    });
    
    // TODO Retrieve select values
  }
}
