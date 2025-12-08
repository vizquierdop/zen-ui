import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import { UsersService } from '../../../services/users.service';

@Component({
  selector: 'app-logout',
  imports: [CommonModule, MatProgressSpinnerModule],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
})
export class Logout {
  constructor(private router: Router, private userService: UsersService) {
    localStorage.removeItem('zen_accessToken');
    localStorage.removeItem('zen_refreshToken');
    localStorage.removeItem('zen_expireDate');
    this.userService.logout();
    void this.router.navigate(['/login']);
  }
}
