import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { OfferedServiceModel } from '../../models/entities/offered-service.models';

@Component({
  selector: 'app-ui-service-item',
  imports: [CommonModule, MatDialogModule, MatIconModule, MatButtonModule],
  templateUrl: './ui-service-item.html',
  styleUrl: './ui-service-item.scss',
})
export class UiServiceItem {
  @Input() service!: OfferedServiceModel;
}
