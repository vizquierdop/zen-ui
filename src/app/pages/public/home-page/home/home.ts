import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'primeng/carousel';
import { ReservationModel } from '../../../../models/entities/reservation.models';
import { UiCarouselReservation } from '../../../../components/ui-carousel-reservation/ui-carousel-reservation';
import { CategoryModel } from '../../../../models/entities/category.models';
import { UiCategoryItem } from '../../../../components/ui-category-item/ui-category-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-public-home',
  imports: [
    CommonModule,
    CarouselModule,
    MatButtonModule,
    MatIconModule,
    UiCarouselReservation,
    UiCategoryItem,
  ],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class PublicHome {
  nextAppointments: ReservationModel[] = [
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
      },
      startTime: '12:00',
      endTime: '13:00',
      status: 0,
    },
  ];
  categories: CategoryModel[] = [
    {
      id: '1',
      name: 'Hairdresser',
    },
    {
      id: '2',
      name: 'Cooking',
    },
    {
      id: '3',
      name: 'Dentist',
    },
    {
      id: '4',
      name: 'Chiropodist',
    },
    {
      id: '5',
      name: 'Beautician',
    },
  ];

  constructor(private readonly router: Router) {}

  goTo(path: string): void {
    void this.router.navigate([`public/${path}`]);
  }
}
