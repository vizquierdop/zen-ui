import { Component, Input } from '@angular/core';
import { OfferedServiceModel } from '../../models/entities/offered-service.models';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { UiCreateReservationModal } from '../ui-create-reservation-modal/ui-create-reservation-modal';

@Component({
  selector: 'app-ui-service-full',
  imports: [CommonModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './ui-service-full.html',
  styleUrl: './ui-service-full.scss',
})
export class UiServiceFull {
  @Input() service!: OfferedServiceModel;

  constructor(private readonly dialog: MatDialog) {}

  openCreateReservationModal(): void {
    const dialogRef = this.dialog.open(UiCreateReservationModal, {
      data: {
        service: this.service,
      },
    });

    dialogRef.afterClosed().subscribe(() => {});
  }
}
