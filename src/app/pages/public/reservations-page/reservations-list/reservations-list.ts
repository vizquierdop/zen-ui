import { CommonModule } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
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
export class PublicReservationsList {
  isLoading = signal(false);
  filtersForm: FormGroup;

  cancelledFilter = signal(false);
  pendingFilter = signal(false);
  acceptedFilter = signal(false);

  cancelledButtonType = signal<'outlined' | 'filled'>('outlined');
  pendingButtonType = signal<'outlined' | 'filled'>('outlined');
  acceptedButtonType = signal<'outlined' | 'filled'>('outlined');

  itemsLength = signal<number>(0);
  totalCount = signal<number>(0);
  hasPreviousPage = signal<boolean>(false);
  hasNextPage = signal<boolean>(false);

  reservations: ReservationModel[] = [
    {
      id: 1,
      date: '27/11/2025',
      serviceId: 1,
      service: {
        id: 1,
        name: 'Service 1',
        description: 'Description 1',
        duration: 60,
        price: 100,
        isActive: true,
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
        }
      },
      startTime: '10:00',
      endTime: '11:00',
      status: 0,
    },
    {
      id: 1,
      date: '27/11/2025',
      serviceId: 2,
      service: {
        id: 2,
        name: 'Service 2',
        description: 'Description 2',
        duration: 60,
        price: 100,
        isActive: true,
        businessId: 2,
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
          userId: 1,
        }
      },
      startTime: '12:00',
      endTime: '13:00',
      status: 0,
    },
  ];

  constructor(private readonly fb: FormBuilder) {
    this.filtersForm = this.fb.group({
      fromDate: [null],
      toDate: [null],
      statusTypes: [null],
    });

    effect(() => {
      this.cancelledButtonType.set(this.cancelledFilter() ? 'filled' : 'outlined');
      this.pendingButtonType.set(this.pendingFilter() ? 'filled' : 'outlined');
      this.acceptedButtonType.set(this.acceptedFilter() ? 'filled' : 'outlined');
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
  }

  previousPage(): void {
    // TODO Implement previous page method.
  }
  nextPage(): void {
    // TODO Implement next page method.
  }
}
