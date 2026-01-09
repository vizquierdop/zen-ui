import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { UiPageHeader } from '../../../../components/ui-page-header/ui-page-header';
import { MatDialogModule } from '@angular/material/dialog';
import { UiCategoryItem } from '../../../../components/ui-category-item/ui-category-item';
import { BusinessModel } from '../../../../models/entities/business.models';
import { ActivatedRoute, Router } from '@angular/router';
import { UiServiceItem } from "../../../../components/ui-service-item/ui-service-item";
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { BusinessesService } from '../../../../services/businesses.service';
import { catchError, EMPTY } from 'rxjs';
import { BusinessGetSingleResponseDTO } from '../../../../models/dtos/business.dto.models';

@Component({
  selector: 'app-public-business-detail',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    UiPageHeader,
    MatDialogModule,
    UiCategoryItem,
    UiServiceItem,
    ToastrModule,
],
  templateUrl: './business-detail.html',
  styleUrl: './business-detail.scss',
})
export class PublicBusinessDetail implements OnInit {
  isLoading = signal<boolean>(false);
  business = signal<BusinessGetSingleResponseDTO | null>(null);
  businessId = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly businessesService: BusinessesService,
    private readonly toastr: ToastrService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.businessId = +this.route.snapshot.paramMap.get('id')!;
    if (this.businessId) {
      this.loadData();
    }
  }

  loadData(): void {
    this.isLoading.set(true);
    this.businessesService.get(this.businessId).pipe(
      catchError(() => {
        this.isLoading.set(false);
        this.toastr.error('Error loading business');
        void this.router.navigate(['public/businesses']);
        return EMPTY;
      })
    ).subscribe((response) => {
      response.offeredServices = response.offeredServices.filter((s) => s.isActive);
      this.business.set(response);
      this.isLoading.set(false);
    });
  }
}
