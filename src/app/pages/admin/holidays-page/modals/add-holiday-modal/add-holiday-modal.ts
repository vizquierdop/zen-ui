import { CommonModule, DatePipe } from '@angular/common';
import { Component, Inject, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HolidayCreateRequestDTO } from '../../../../../models/dtos/holiday.dto.models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HolidaysService } from '../../../../../services/holidays.service';
import { catchError, EMPTY } from 'rxjs';

@Component({
  selector: 'app-add-holiday-modal',
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ToastrModule,
  ],
  providers: [DatePipe],
  templateUrl: './add-holiday-modal.html',
  styleUrl: './add-holiday-modal.scss',
})
export class AddHolidayModal implements OnInit {
  isLoading = signal<boolean>(false);
  addHolidaysForm: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      businessId: number;
    },
    public dialog: MatDialogRef<AddHolidayModal>,
    private readonly datePipe: DatePipe,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly holidaysService: HolidaysService,
  ) {
    this.addHolidaysForm = this.fb.group({
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      businessId: [this.data.businessId],
    });
  }
  ngOnInit(): void {
    // TODO Retrieve and map businessId.
  }

  save(): void {
    const request: HolidayCreateRequestDTO = {
      startDate: this.datePipe.transform(
        this.addHolidaysForm.get('startDate')?.value,
        'yyyy-MM-dd'
      )!,
      endDate: this.datePipe.transform(this.addHolidaysForm.get('endDate')?.value, 'yyyy-MM-dd')!,
      businessId: this.addHolidaysForm.get('businessId')?.value,
    };
    this.isLoading.set(true);
    this.holidaysService.create(request).pipe(
      catchError(() => {
        this.isLoading.set(false);
        this.toastr.error('Error adding holiday');
        return EMPTY;
      })
    ).subscribe(() => {
      this.isLoading.set(false);
      this.toastr.success('Holiday added successfully');
      this.dialog.close(true);
    });
  }

  close(): void {
    this.dialog.close(false);
  }
}
