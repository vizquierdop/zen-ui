import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ui-header',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
  ],
  templateUrl: './ui-header.html',
  styleUrl: './ui-header.scss',
})
export class UiHeader {
  @Input()
  origin: 'admin' | 'public' = 'public';

  @Output()
  drawerToggle$ = new EventEmitter<void>();

  constructor(private readonly router: Router) {}

  goToRoot() {
    void this.router.navigate([`${this.origin}`])
  }

  logout(): void {
    void this.router.navigate(['/logout']);
  }
}
