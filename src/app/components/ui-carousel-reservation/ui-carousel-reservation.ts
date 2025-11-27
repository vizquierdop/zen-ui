import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ReservationModel } from '../../models/entities/reservation.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ui-carousel-reservation',
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './ui-carousel-reservation.html',
  styleUrl: './ui-carousel-reservation.scss',
})
export class UiCarouselReservation {
  @Input() reservation!: ReservationModel;

  constructor(private readonly router: Router) {}
}
