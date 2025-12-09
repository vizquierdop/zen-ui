import { AfterViewInit, Component, ElementRef, signal, ViewChild } from '@angular/core';
import { UiPageHeader } from '../../../../components/ui-page-header/ui-page-header';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiCategoryItem } from '../../../../components/ui-category-item/ui-category-item';
import { CategoryModel } from '../../../../models/entities/category.models';
import { CategoriesService } from '../../../../services/categories.service';
import { CategoryGetAllRequestDTO } from '../../../../models/dtos/category.dto.models';
import { catchError, EMPTY } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-public-categories-list',
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    UiCategoryItem,
    UiPageHeader,
    ToastrModule,
  ],
  templateUrl: './categories-list.html',
  styleUrl: './categories-list.scss',
})
export class PublicCategoriesList implements AfterViewInit {
  @ViewChild('searchInput') searchInput: ElementRef = ViewChild('searchInput');
  isLoading = signal(false);
  
  categories: CategoryModel[] = [];

  constructor(private readonly categoriesService: CategoriesService, private readonly toastr: ToastrService) {}

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading.set(true);
    const request: CategoryGetAllRequestDTO = {
      paginationLength: 9999,
    };
    if (this.searchInput.nativeElement.value) {
      request.search = this.searchInput.nativeElement.value;
    }
    this.categoriesService.getAll(request).pipe(
      catchError(() => {
        this.isLoading.set(false);
        return EMPTY;
      })
    ).subscribe((response) => {
      this.categories = response.items;
      this.isLoading.set(false);
    });
  }

  onSearch(): void {
    this.loadData();
  }
}
