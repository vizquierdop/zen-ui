import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryModel } from '../../models/entities/category.models';
import { BusinessCategoriesService } from '../../services/business-categories.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationModal } from '../confirmation-modal/confirmation-modal';
import { EMPTY, switchMap } from 'rxjs';

@Component({
  selector: 'app-ui-category-full',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './ui-category-full.html',
  styleUrl: './ui-category-full.scss',
})
export class UiCategoryFull {
  @Input() category!: CategoryModel;
  @Output() hasToReload$ = new EventEmitter<void>();

  constructor(
    private readonly businessCategoriesService: BusinessCategoriesService,
    private readonly dialog: MatDialog
  ) {}

  openConfirmationModal(): void {
    const dialogRef = this.dialog.open(ConfirmationModal, {
      data: {
        message:
          'The relation between this category and your business will be removed. Do you want to continue?',
      },
    });

    let hasToReload = false;

    dialogRef.afterClosed().pipe(
      switchMap(result => {
        // if (result) {
        //   hasToReload = true;
        //   return this.businessCategoriesService.delete()
        // }
        return EMPTY;
      })
    ).subscribe(() => {
      if (hasToReload) {
        this.hasToReload$.emit();
      }
    });
  }
}
