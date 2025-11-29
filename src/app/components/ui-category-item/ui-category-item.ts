import { Component, Input } from '@angular/core';
import { CategoryModel } from '../../models/entities/category.models';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ui-category-item',
  imports: [
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './ui-category-item.html',
  styleUrl: './ui-category-item.scss',
})
export class UiCategoryItem {
  @Input() category!: CategoryModel;

  constructor(private readonly router: Router) {}

  goToCategory(): void {
    void this.router.navigate([`public/businesses?category=${this.category.id}`]);
  }
}
