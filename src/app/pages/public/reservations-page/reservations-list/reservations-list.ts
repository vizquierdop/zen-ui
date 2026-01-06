import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiPageHeader } from '../../../../components/ui-page-header/ui-page-header';
import { UiMobilePaginator } from '../../../../components/ui-mobile-paginator/ui-mobile-paginator';
import { ReservationModel } from '../../../../models/entities/reservation.models';
import { UiReservationFull } from "../../../../components/ui-reservation-full/ui-reservation-full";
import { ReservationsService } from '../../../../services/reservations.service';
import { ReservationGetAllRequestDTO } from '../../../../models/dtos/reservation.dto.models';
import { UsersService } from '../../../../services/users.service';
import { ReservationStatusType } from '../../../../models/enums/reservation-status-type.enum';

@Component({
  selector: 'app-public-reservations-list',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    UiPageHeader,
    UiMobilePaginator,
    UiReservationFull
],
  templateUrl: './reservations-list.html',
  styleUrl: './reservations-list.scss',
})
export class PublicReservationsList implements OnInit {
  isLoading = signal(false);
  filtersForm: FormGroup;

  cancelledFilter = signal(false);
  pendingFilter = signal(false);
  acceptedFilter = signal(true);

  cancelledButtonType = signal<'outlined' | 'filled'>('outlined');
  pendingButtonType = signal<'outlined' | 'filled'>('outlined');
  acceptedButtonType = signal<'outlined' | 'filled'>('filled');

  itemsLength = signal<number>(0);
  totalCount = signal<number>(0);
  hasPreviousPage = signal<boolean>(false);
  hasNextPage = signal<boolean>(false);
  currentPage = signal(1);
  reservations: ReservationModel[] = [];

  userId!: number;

  constructor(
    private readonly fb: FormBuilder,
    private readonly reservationsService: ReservationsService,
    private readonly usersService: UsersService,
  ) {
    this.filtersForm = this.fb.group({
      startDate: [null],
      endDate: [null],
    });

    effect(() => {
      this.cancelledButtonType.set(this.cancelledFilter() ? 'filled' : 'outlined');
      this.pendingButtonType.set(this.pendingFilter() ? 'filled' : 'outlined');
      this.acceptedButtonType.set(this.acceptedFilter() ? 'filled' : 'outlined');
    });
  }

  ngOnInit(): void {
    this.usersService.user$.subscribe((user) => {
      this.userId = user!.id;
      this.loadData();
    });
  }

  loadData(): void {
    this.isLoading.set(true);
    const request: ReservationGetAllRequestDTO = {
      userId: this.userId,
      paginationLength: 5,
      paginationSkip: this.currentPage(),
    };
    if (this.filtersForm.get('startDate')?.value) {
      request.startDate = this.filtersForm.get('startDate')?.value;
    }
    if (this.filtersForm.get('endDate')?.value) {
      request.endDate = this.filtersForm.get('endDate')?.value;
    }

    const selectedStatuses: number[] = [];
    if (this.pendingFilter()) {
      selectedStatuses.push(ReservationStatusType.PENDING);
    }
    if (this.acceptedFilter()) {
      selectedStatuses.push(ReservationStatusType.ACCEPTED);
    }
    if (this.cancelledFilter()) {
      selectedStatuses.push(ReservationStatusType.CANCELLED);
    }

    if (selectedStatuses.length > 0) {
      request.statusTypes = selectedStatuses.join(',');
    }
    
    this.reservationsService.getAll(request).subscribe((response) => {
      this.reservations = response.items;
      this.itemsLength.set(response.items.length);
      this.totalCount.set(response.totalCount);
      this.hasNextPage.set(response.hasNextPage);
      this.hasPreviousPage.set(response.hasPreviousPage);
      this.isLoading.set(false);
    });

  }

  updateStatus(type: 'cancelled' | 'pending' | 'accepted'): void {
    switch (type) {
      case 'cancelled':
        this.cancelledFilter.update((value) => !value);
        break;
      case 'pending':
        this.pendingFilter.update((value) => !value);
        break;
      case 'accepted':
        this.acceptedFilter.update((value) => !value);
        break;
      default:
        break;
    }
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
