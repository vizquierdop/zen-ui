import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-base',
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './base.html',
  styleUrl: './base.scss',
})
export class Base {

}
