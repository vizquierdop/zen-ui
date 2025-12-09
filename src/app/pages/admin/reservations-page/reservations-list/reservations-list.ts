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
import { Router } from '@angular/router';
import { MatSort } from '@angular/material/sort';
import { RESERVATIONS_COLUMNS } from './reservations.columns';
import { ObjectDataSource } from '../../../../utils/lists/datasource';
import { ReservationModel } from '../../../../models/entities/reservation.models';
import { ReservationsService } from '../../../../services/reservations.service';
import { UsersService } from '../../../../services/users.service';
import {
  ReservationGetAllRequestDTO,
  ReservationUpdateRequestDTO,
} from '../../../../models/dtos/reservation.dto.models';
import { catchError, delay, EMPTY, switchMap } from 'rxjs';
import { OfferedServicesService } from '../../../../services/offered-services.service';
import { EnumService } from '../../../../services/enum.service';
import { UISelectModel } from '../../../../models/basic/ui-select.model';
import { UIPaginator } from '../../../../components/ui-paginator/ui-paginator';
import { MatMenuModule } from '@angular/material/menu';
import { UITableTag } from '../../../../components/ui-table-tag/ui-table-tag';
import { CdkTableModule } from '@angular/cdk/table';
import { ReservationStatusTypePipe } from '../../../../utils/pipes/reservation-status-type.pipe';
import { UpdateReservationModal } from '../modals/update-reservation-modal/update-reservation-modal';
import { ConfirmationModal } from '../../../../components/confirmation-modal/confirmation-modal';
import { ReservationStatusType } from '../../../../models/enums/reservation-status-type.enum';
import { ToastrModule, ToastrService } from 'ngx-toastr';

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
    UIPaginator,
    MatMenuModule,
    UITableTag,
    CdkTableModule,
    ReservationStatusTypePipe,
    ToastrModule,
  ],
  templateUrl: './reservations-list.html',
  styleUrl: './reservations-list.scss',
})
export class AdminReservationsList implements IListPage, AfterViewInit {
  @ViewChild(MatSort) sort: MatSort = ViewChild(MatSort);
  @ViewChild('searchInput') searchInput: ElementRef = ViewChild('searchInput');

  displayedColumns: string[] = RESERVATIONS_COLUMNS.map((c) => c.name);
  currentPage = signal(1);
  hasPreviousPage = signal(false);
  hasNextPage = signal(false);
  totalPages = signal(0);
  totalCount = signal(0);

  dataSource = new ObjectDataSource<ReservationModel>();

  isLoading = signal(true);

  reservationFilters = ReservationFilters;
  filters: WritableSignal<{ [key: string]: any }> = signal({});
  hasFilters = false;

  businessId!: number;

  constructor(
    private readonly dialog: MatDialog,
    private readonly persistentFiltersService: PersistentFiltersService,
    private readonly router: Router,
    private readonly reservationsService: ReservationsService,
    private readonly usersService: UsersService,
    private readonly offeredServicesService: OfferedServicesService,
    private readonly enumService: EnumService,
    private readonly toastr: ToastrService,
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
    this.usersService.user$.subscribe((user) => {
      if (user && user.businessId) {
        this.businessId = user.businessId;
        this.loadData();
      }
    });
  }

  loadData(): void {
    this.isLoading.set(true);
    const request: ReservationGetAllRequestDTO = {
      ...this.filters(),
      paginationLength: 25,
      paginationSkip: this.currentPage(),
      // orderBy: this.sort.active,
      // orderDirection: this.sort.direction === 'asc' ? 0 : 1,
      businessId: this.businessId,
    };

    if (this.searchInput.nativeElement.value) {
      request.search = this.searchInput.nativeElement.value;
    }

    this.reservationsService
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
      UISectionKeysEnum.ADMIN_RESERVATIONS,
      this.searchInput.nativeElement.value
    );
    this.currentPage.set(1);
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
        this.persistentFiltersService.setSectionFilters(
          UISectionKeysEnum.ADMIN_RESERVATIONS,
          result
        );
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
      UISectionKeysEnum.ADMIN_RESERVATIONS,
      this.filters()
    );
    this.currentPage.set(1);
    this.loadData();
  }

  goCreate(): void {
    void this.router.navigate(['/admin/reservations/create']);
  }

  viewDetails(reservation: ReservationModel): void {
    const dialogRef = this.dialog.open(UpdateReservationModal, {
      data: {
        reservation,
      },
      maxWidth: '750px',
      minWidth: '750px',
    });

    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.loadData();
      }
    });
  }

  confirmReservation(reservation: ReservationModel): void {
    const dialogRef = this.dialog.open(ConfirmationModal, {
      data: {
        message: 'The reservation will be confirmed. Do you want to continue?',
      },
    });

    dialogRef.afterClosed().pipe(
      switchMap((result) => {
        if (result) {
          const request: ReservationUpdateRequestDTO = {
            id: reservation.id,
            date: reservation.date,
            endTime: reservation.endTime,
            serviceId: reservation.serviceId,
            startTime: reservation.startTime,
            status: ReservationStatusType.ACCEPTED,
            customerEmail: reservation.customerEmail,
            customerName: reservation.customerName,
            customerPhone: reservation.customerPhone,
          };

          return this.reservationsService.update(request);
        }
        return EMPTY;
      }),
      catchError(() => {
        this.toastr.error('Error confirming reservation');
        return EMPTY;
      })
    ).subscribe(() => {
      this.toastr.success('Reservation confirmed successfully');
      this.loadData();
    });
  }

  cancelReservation(reservation: ReservationModel): void {
    const dialogRef = this.dialog.open(ConfirmationModal, {
      data: {
        message: 'The reservation will be rejected. Do you want to continue?',
      },
    });

    dialogRef.afterClosed().pipe(
      switchMap((result) => {
        if (result) {
          const request: ReservationUpdateRequestDTO = {
            id: reservation.id,
            date: reservation.date,
            endTime: reservation.endTime,
            serviceId: reservation.serviceId,
            startTime: reservation.startTime,
            status: ReservationStatusType.CANCELLED,
            customerEmail: reservation.customerEmail,
            customerName: reservation.customerName,
            customerPhone: reservation.customerPhone,
          };

          return this.reservationsService.update(request);
        }
        return EMPTY;
      }),
      catchError(() => {
        this.toastr.error('Error cancelling reservation');
        return EMPTY;
      })
    ).subscribe(() => {
      this.toastr.success('Reservation cancelled successfully');
      this.loadData();
    });
  }

  loadFilterSelectValues(): void {
    this.reservationFilters.map((f: UIFilterModel) => {
      if (f.values) f.values = [];
      return f;
    });

    this.offeredServicesService
      .getSelectOptions(this.businessId)
      .subscribe((offeredServices: UISelectModel[]) => {
        // OfferedServices
        this.reservationFilters
          .find((f: UIFilterModel) => f.name === 'serviceIds')
          ?.values?.push(...offeredServices);

        // ReservationStatusTypes
        const reservationStatusTypes = this.enumService.getReservationStatusTypeOptions();
        this.reservationFilters
          .find((f: UIFilterModel) => f.name === 'statusTypes')
          ?.values?.push(...reservationStatusTypes);
      });
  }
}
