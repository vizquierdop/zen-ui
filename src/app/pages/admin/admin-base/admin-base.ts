import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-base',
  imports: [
    RouterOutlet,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
  ],
  templateUrl: './admin-base.html',
  styleUrl: './admin-base.scss',
})
export class AdminBase {
  title = 'zen';
  drawerMode: MatDrawerMode = 'push';
  hasBackdrop = false;

  isOpened = true;

  constructor(private readonly router: Router) {}

  logout(): void {
    void this.router.navigate(['/logout']);
  }
}
