import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CategoryModel } from '../../models/entities/category.models';
import { BusinessCategoriesService } from '../../services/business-categories.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ConfirmationModal } from '../confirmation-modal/confirmation-modal';
import { catchError, EMPTY, switchMap } from 'rxjs';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-ui-category-full',
  imports: [CommonModule, MatButtonModule, MatIconModule, MatDialogModule, ToastrModule],
  templateUrl: './ui-category-full.html',
  styleUrl: './ui-category-full.scss',
})
export class UiCategoryFull {
  @Input() category!: CategoryModel;
  @Input() businessId!: number;
  @Output() hasToReload$ = new EventEmitter<void>();

  constructor(
    private readonly businessCategoriesService: BusinessCategoriesService,
    private readonly dialog: MatDialog,
    private readonly toastr: ToastrService
  ) {}

  openConfirmationModal(): void {
    const dialogRef = this.dialog.open(ConfirmationModal, {
      data: {
        message:
          'The relation between this category and your business will be removed. Do you want to continue?',
      },
    });

    let hasToReload = false;

    dialogRef
      .afterClosed()
      .pipe(
        switchMap((result) => {
          if (result) {
            hasToReload = true;
            return this.businessCategoriesService.delete(this.businessId, this.category.id);
          }
          return EMPTY;
        }),
        catchError(() => {
          this.toastr.error('An error occurred while deleting the business-category relation.');
          return EMPTY;
        })
      )
      .subscribe(() => {
        if (hasToReload) {
          this.hasToReload$.emit();
        }
      });
  }
}
