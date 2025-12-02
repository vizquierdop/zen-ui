import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { OfferedServiceModel } from '../../models/entities/offered-service.models';
import { UiCreateReservationModal } from '../ui-create-reservation-modal/ui-create-reservation-modal';

@Component({
  selector: 'app-ui-service-item',
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './ui-service-item.html',
  styleUrl: './ui-service-item.scss',
})
export class UiServiceItem {
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
