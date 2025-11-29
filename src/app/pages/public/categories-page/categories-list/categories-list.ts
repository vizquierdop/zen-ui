import { Component } from '@angular/core';
import { UiPageHeader } from '../../../../components/ui-page-header/ui-page-header';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiCategoryItem } from '../../../../components/ui-category-item/ui-category-item';
import { CategoryModel } from '../../../../models/entities/category.models';

@Component({
  selector: 'app-public-categories-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    UiCategoryItem,
    UiPageHeader,
  ],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.scss',
})
export class PublicCategoriesList {
  categories: CategoryModel[] = [
    {
      id: '1',
      name: 'Hairdresser',
    },
    {
      id: '2',
      name: 'Cooking',
    },
    {
      id: '3',
      name: 'Dentist',
    },
    {
      id: '4',
      name: 'Chiropodist',
    },
    {
      id: '5',
      name: 'Beautician',
    },
  ];

  constructor() {}

  onSearch(): void {
    // TODO Implement onSearch
  }
}
