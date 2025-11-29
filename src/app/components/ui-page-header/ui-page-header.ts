import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ui-page-header',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './ui-page-header.html',
  styleUrl: './ui-page-header.scss',
})
export class UiPageHeader {
  @Input() title = '';
  @Input() backUrl: string | null = null;
  @Input() actionText: string | null = null;
  @Output() actionClick$ = new EventEmitter<void>();

  constructor(private readonly router: Router) {}

  goBack(): void {
    if (!this.backUrl) return;
    void this.router.navigate([this.backUrl]);
  }
}
