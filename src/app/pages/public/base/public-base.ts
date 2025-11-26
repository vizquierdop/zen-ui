import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UiHeader } from '../../../components/ui-header/ui-header';
import { UISectionModel } from '../../../models/basic/ui-section.model';
import { PublicUISections } from '../../../utils/ui-sections';

@Component({
  selector: 'app-public-base',
  imports: [
    RouterOutlet,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    UiHeader,
  ],
  templateUrl: './public-base.html',
  styleUrl: './public-base.scss',
})
export class PublicBase {
  title = 'zen';
  drawerMode: MatDrawerMode = 'over';
  hasBackdrop = false;

  isOpened = false;

  sections: UISectionModel[] = PublicUISections;

  constructor(private readonly router: Router) {}
}
