import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDrawerMode, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { UISectionModel } from '../../../models/basic/ui-section.model';
import { AdminUISections } from '../../../utils/ui-sections';
import { UiHeader } from '../../../components/ui-header/ui-header';
import { UsersService } from '../../../services/users.service';
import { UserModel } from '../../../models/entities/user.models';

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
    UiHeader,
  ],
  templateUrl: './admin-base.html',
  styleUrl: './admin-base.scss',
})
export class AdminBase {
  title = 'zen';
  drawerMode: MatDrawerMode = 'push';
  hasBackdrop = false;

  isOpened = true;

  sections: UISectionModel[] = AdminUISections;

  user!: UserModel;
  userBusinessName = '';

  constructor(private readonly router: Router, private readonly usersService: UsersService) {
    this.usersService.user$.subscribe((user) => {
      this.user = user!;
      this.userBusinessName = `${user!.business!.name}`.toUpperCase();
    });
  }

  // logout(): void {
  //   void this.router.navigate(['/logout']);
  // }
}
