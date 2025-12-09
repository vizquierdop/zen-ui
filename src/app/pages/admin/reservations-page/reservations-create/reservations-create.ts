import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { UISelectModel } from '../../../../models/basic/ui-select.model';
import { Router } from '@angular/router';
import { ReservationStatusType } from '../../../../models/enums/reservation-status-type.enum';
import { ReservationsService } from '../../../../services/reservations.service';
import { OfferedServicesService } from '../../../../services/offered-services.service';
import { EnumService } from '../../../../services/enum.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { UsersService } from '../../../../services/users.service';
import { ReservationCreateRequestDTO } from '../../../../models/dtos/reservation.dto.models';
import { EMPTY } from 'rxjs/internal/observable/empty';
import { catchError } from 'rxjs';

@Component({
  selector: 'app-admin-reservations-create',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    ToastrModule,
  ],
  templateUrl: './reservations-create.html',
  styleUrl: './reservations-create.scss',
})
export class AdminReservationsCreate implements OnInit, AfterViewInit {
  isLoading = signal(false);
  reservationForm: FormGroup;
  businessId!: number;

  reservationStatusOptions: UISelectModel[] = [];
  servicesOptions: UISelectModel[] = [];

  constructor(
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly reservationsService: ReservationsService,
    private readonly offeredServicesService: OfferedServicesService,
    private readonly enumService: EnumService,
    private usersService: UsersService,
    private readonly toastr: ToastrService,
  ) {
    this.reservationForm = this.fb.group({
      customerName: [null, Validators.required],
      customerEmail: [null],
      customerPhone: [null, Validators.required],
      serviceId: [null, Validators.required],
      status: [ReservationStatusType.PENDING],
      date: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      // comments: [null],
    });
  }

  ngOnInit(): void {
    this.usersService.user$.subscribe((user) => {
      this.businessId = user!.businessId!;
      this.loadSelectValues();
    });
  }

  ngAfterViewInit(): void {
    // TODO Start time value changes to set end time.
  }

  loadSelectValues(): void {
    this.offeredServicesService.getSelectOptions(this.businessId).subscribe((offeredServices: UISelectModel[]) => {
      this.servicesOptions = offeredServices;
      this.reservationStatusOptions = this.enumService.getReservationStatusTypeOptions();
    });
  }

  save(): void {
    this.isLoading.set(true);
    const request: ReservationCreateRequestDTO = {
      customerName: this.reservationForm.get('customerName')?.value,
      customerPhone: this.reservationForm.get('customerPhone')?.value,
      customerEmail: this.reservationForm.get('customerEmail')?.value,
      date: this.reservationForm.get('date')?.value,
      startTime: this.reservationForm.get('startTime')?.value,
      endTime: this.reservationForm.get('endTime')?.value,
      status: this.reservationForm.get('status')?.value,
      serviceId: this.reservationForm.get('serviceId')?.value,
      // comments: this.reservationForm.get('comments')?.value,
    };

    this.reservationsService.create(request).pipe(
      catchError(() => {
        this.isLoading.set(false);
        this.toastr.error('Error adding reservation');
        return EMPTY;
      })
    ).subscribe(() => {
      this.isLoading.set(false);
      this.toastr.success('Reservation added successfully');
      void this.router.navigate(['/admin/reservations']);
    });
  }

  goBack(): void {
    void this.router.navigate(['/admin/reservations']);
  }
}
