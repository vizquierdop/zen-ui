import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'primeng/carousel';
import { ReservationModel } from '../../../../models/entities/reservation.models';
import { UiCarouselReservation } from '../../../../components/ui-carousel-reservation/ui-carousel-reservation';
import { CategoryModel } from '../../../../models/entities/category.models';
import { UiCategoryItem } from '../../../../components/ui-category-item/ui-category-item';
import { Router } from '@angular/router';
import { CategoriesService } from '../../../../services/categories.service';
import { UsersService } from '../../../../services/users.service';
import { ReservationsService } from '../../../../services/reservations.service';
import { catchError, EMPTY, forkJoin } from 'rxjs';
import { UserModel } from '../../../../models/entities/user.models';
import { CategoryGetAllResponseDTO } from '../../../../models/dtos/category.dto.models';
import { ReservationGetAllResponseDTO } from '../../../../models/dtos/reservation.dto.models';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-public-home',
  imports: [
    CommonModule,
    CarouselModule,
    MatButtonModule,
    MatIconModule,
    UiCarouselReservation,
    UiCategoryItem,
    ToastrModule,
    MatProgressSpinnerModule,
  ],
  providers: [DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class PublicHome implements OnInit {
  isLoading = signal(false);
  nextAppointments: ReservationModel[] = [];
  categories: CategoryModel[] = [];
  user!: UserModel;

  constructor(
    private readonly router: Router,
    private readonly categoriesService: CategoriesService,
    private readonly usersService: UsersService,
    private readonly reservationsService: ReservationsService,
    private readonly toastr: ToastrService,
    private readonly datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.usersService.user$.subscribe((user) => {
      this.user = user!;
      this.loadData();
    });
  }

  loadData(): void {
    this.isLoading.set(true);
    const startDate = new Date();
    const endDate = new Date(startDate).setDate(startDate.getDate() + 6);
    forkJoin({
      categories: this.categoriesService.getAll({ paginationLength: 9999 }),
      reservations: this.reservationsService.getAll({
        paginationLength: 9999,
        userId: this.user.id,
        startDate: this.datePipe.transform(startDate, 'yyyy-MM-dd')!,
        endDate: this.datePipe.transform(endDate, 'yyyy-MM-dd')!,
      }),
    })
      .pipe(
        catchError(() => {
          this.isLoading.set(false);
          this.toastr.error('Error loading data');
          return EMPTY;
        })
      )
      .subscribe(
        (response: {
          categories: CategoryGetAllResponseDTO;
          reservations: ReservationGetAllResponseDTO;
        }) => {
          this.categories = response.categories.items;
          this.nextAppointments = response.reservations.items;
          this.isLoading.set(false);
        }
      );
  }

  goTo(path: string): void {
    void this.router.navigate([`public/${path}`]);
  }
}
