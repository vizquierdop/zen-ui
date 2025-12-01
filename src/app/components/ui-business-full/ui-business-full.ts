import { Component, Input } from '@angular/core';
import { BusinessModel } from '../../models/entities/business.models';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-ui-business-full',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './ui-business-full.html',
  styleUrl: './ui-business-full.scss',
})
export class UiBusinessFull {
  @Input() business!: BusinessModel;

  constructor(private readonly router: Router) {}

  viewDetails(): void {
    void this.router.navigate([`public/businesses/${this.business.id}`]);
  }
}
