import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { UiPageHeader } from '../../../../components/ui-page-header/ui-page-header';
import { UiMobilePaginator } from '../../../../components/ui-mobile-paginator/ui-mobile-paginator';
import { BusinessModel } from '../../../../models/entities/business.models';
import { Router } from '@angular/router';
import { MatDialogClose } from "@angular/material/dialog";
import { UISelectModel } from '../../../../models/basic/ui-select.model';
import { UiBusinessFull } from "../../../../components/ui-business-full/ui-business-full";

@Component({
  selector: 'app-public-businesses-list',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    UiPageHeader,
    UiMobilePaginator,
    UiBusinessFull
],
  templateUrl: './businesses-list.html',
  styleUrl: './businesses-list.scss',
})
export class PublicBusinessesList {
  isLoading = signal(false);
  filtersForm: FormGroup;

  itemsLength = signal<number>(0);
  totalCount = signal<number>(0);
  hasPreviousPage = signal<boolean>(false);
  hasNextPage = signal<boolean>(false);

  categoryOptions: UISelectModel[] = [];
  businesses: BusinessModel[] = [
    {
      id: 1,
      name: 'Business 1',
      address: 'Av. Navarra, 3, Zaragoza',
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
    {
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
    {
      id: 3,
      name: 'Business 3',
      address: 'Address 3',
      vacations: [],
      availabilities: [],
      categories: [],
      googleMaps: '',
      phone: '',
      province: {
        id: '3',
        name: 'Province 3',
      },
      provinceId: 3,
      services: [],
      simultaneousBookings: 0,
      userId: 3,
    },
    {
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
    {
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
    {
      id: 3,
      name: 'Business 3',
      address: 'Address 3',
      vacations: [],
      availabilities: [],
      categories: [],
      googleMaps: '',
      phone: '',
      province: {
        id: '3',
        name: 'Province 3',
      },
      provinceId: 3,
      services: [],
      simultaneousBookings: 0,
      userId: 3,
    },
  ];

  constructor(private readonly router: Router, private readonly fb: FormBuilder) {
    this.filtersForm = this.fb.group({
      name: [null],
      categoryIds: [null],
    });

    this.loadSelectValues();
  }

  loadSelectValues(): void {
    // TODO Implement loadSelectValues method.
  }

  previousPage(): void {
    // TODO Implement previous page method.
  }
  nextPage(): void {
    // TODO Implement next page method.
  }
}
