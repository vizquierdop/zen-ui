import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { UiPageHeader } from '../../../../components/ui-page-header/ui-page-header';
import { UiMobilePaginator } from '../../../../components/ui-mobile-paginator/ui-mobile-paginator';
import { BusinessModel } from '../../../../models/entities/business.models';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogClose } from "@angular/material/dialog";
import { UISelectModel } from '../../../../models/basic/ui-select.model';
import { UiBusinessFull } from "../../../../components/ui-business-full/ui-business-full";
import { BusinessesService } from '../../../../services/businesses.service';
import { CategoriesService } from '../../../../services/categories.service';
import { catchError, EMPTY } from 'rxjs';
import { BusinessGetAllRequestDTO, BusinessGetSingleResponseDTO } from '../../../../models/dtos/business.dto.models';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../services/users.service';
import { UserModel } from '../../../../models/entities/user.models';

@Component({
  selector: 'app-public-businesses-list',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    UiPageHeader,
    UiMobilePaginator,
    UiBusinessFull,
    ToastrModule,
],
  templateUrl: './businesses-list.html',
  styleUrl: './businesses-list.scss',
})
export class PublicBusinessesList implements OnInit, AfterViewInit {
  isLoading = signal<boolean>(false);
  itemsLength = signal<number>(0);
  totalCount = signal<number>(0);
  hasPreviousPage = signal<boolean>(false);
  hasNextPage = signal<boolean>(false);
  currentPage = signal(1);

  filtersForm: FormGroup;

  categoryOptions: UISelectModel[] = [];
  businesses: BusinessModel[] = [];

  user!: UserModel;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly fb: FormBuilder,
    private readonly businessesService: BusinessesService,
    private readonly categoriesService: CategoriesService,
    private readonly toastr: ToastrService,
    private readonly usersService: UsersService,
  ) {
    this.filtersForm = this.fb.group({
      name: [null],
      categoryIds: [null],
    });
  }
  
  ngOnInit(): void {
    this.loadSelectValues();
    const categoryId = this.route.snapshot.queryParamMap.get('categoryId');
    if (categoryId) {
      this.filtersForm.patchValue({ 
        categoryIds: [+categoryId] 
      });
    }
    this.usersService.user$.subscribe((user) => {
      this.user = user!;
      this.loadData();
    })
  }

  ngAfterViewInit(): void {
    this.filtersForm.get('name')?.valueChanges.subscribe(() => {
      this.currentPage.set(1);
      this.loadData();
    });
    this.filtersForm.get('categoryIds')?.valueChanges.subscribe(() => {
      this.currentPage.set(1);
      this.loadData();
    });
  }

  loadData(): void {
    this.isLoading.set(true);
    const request: BusinessGetAllRequestDTO = {
      isActive: true,
      name: this.filtersForm.get('name')?.value,
      categoryIds: this.filtersForm.get('categoryIds')?.value,
      provinceId: this.user.provinceId,
      paginationLength: 5,
      paginationSkip: this.currentPage(),
    };
    this.businessesService.getAll(request).pipe(
      catchError(() => {
        this.isLoading.set(false);
        this.toastr.error('Error loading data');
        return EMPTY;
      })
    ).subscribe((response) => {
      this.businesses = response.items;
      this.itemsLength.set(response.items.length);
      this.totalCount.set(response.totalCount);
      this.hasNextPage.set(response.hasNextPage);
      this.hasPreviousPage.set(response.hasPreviousPage);
      this.isLoading.set(false);
    });
  }

  loadSelectValues(): void {
    this.categoriesService.getSelectOptions().pipe(
      catchError(() => {
        this.toastr.error('Error loading data');
        return EMPTY;
      })
    ).subscribe((categories) => {
      this.categoryOptions = categories;
    });
  }

  previousPage(): void {
    this.currentPage.update((val) => val - 1);
    this.loadData();
  }
  nextPage(): void {
    this.currentPage.update((val) => val + 1);
    this.loadData();
  }
}
