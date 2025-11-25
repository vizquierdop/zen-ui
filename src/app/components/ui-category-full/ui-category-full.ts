import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryModel } from '../../models/entities/category.models';

@Component({
  selector: 'app-ui-category-full',
  imports: [CommonModule, MatButtonModule, MatIconModule],
  templateUrl: './ui-category-full.html',
  styleUrl: './ui-category-full.scss',
})
export class UiCategoryFull {
  @Input() category!: CategoryModel;

  constructor() {}
}
