import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReservationModel } from '../../models/entities/reservation.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ui-reservation-full',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './ui-reservation-full.html',
  styleUrl: './ui-reservation-full.scss',
})
export class UiReservationFull {
  @Input() reservation!: ReservationModel;

  constructor (private router: Router) {}
}
