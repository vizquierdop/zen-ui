import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-auth-header',
  imports: [],
  templateUrl: './auth-header.html',
  styleUrl: './auth-header.scss',
})
export class AuthHeader {
  @Input() type: 'register' | 'login' = 'login';
}
