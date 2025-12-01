import { Component, Input } from '@angular/core';
import { OfferedServiceModel } from '../../models/entities/offered-service.models';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ui-service-full',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './ui-service-full.html',
  styleUrl: './ui-service-full.scss',
})
export class UiServiceFull {
  @Input() service!: OfferedServiceModel;
}
