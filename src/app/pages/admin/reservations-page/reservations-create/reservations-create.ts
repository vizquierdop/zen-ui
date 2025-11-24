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
  ],
  templateUrl: './reservations-create.html',
  styleUrl: './reservations-create.scss',
})
export class AdminReservationsCreate implements OnInit, AfterViewInit {
  isLoading = signal(false);
  reservationForm: FormGroup;

  reservationStatusOptions: UISelectModel[] = [];
  servicesOptions: UISelectModel[] = [];

  constructor(private readonly fb: FormBuilder, private readonly router: Router) {
    this.reservationForm = this.fb.group({
      customerName: [null, Validators.required],
      customerEmail: [null],
      customerPhone: [null, Validators.required],
      serviceId: [null, Validators.required],
      status: [0], // TODO Accepted by default
      date: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      comments: [null],
    });
  }

  ngOnInit(): void {
    this.loadSelectValues();
  }

  ngAfterViewInit(): void {
    // TODO Start time value changes to set end time.
  }

  loadSelectValues(): void {
    // TODO Load reservation statuses options.
    // TODO Load services options.
  }

  save(): void {
    // TODO Implement save method.
    this.isLoading.set(true);
    setTimeout(() => {
      this.isLoading.set(false);
    }, 500);
  }

  goBack(): void {
    void this.router.navigate(['/admin/reservations']);
  }
}
