import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { HolidayCreateRequestDTO } from '../../../../../models/dtos/holiday.dto.models';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';

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
  ],
  providers: [DatePipe],
  templateUrl: './add-holiday-modal.html',
  styleUrl: './add-holiday-modal.scss',
})
export class AddHolidayModal implements OnInit {
  isLoading = signal<boolean>(false);
  addHolidaysForm: FormGroup;

  constructor(
    public dialog: MatDialogRef<AddHolidayModal>,
    private readonly datePipe: DatePipe,
    private readonly fb: FormBuilder
  ) {
    this.addHolidaysForm = this.fb.group({
      startDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      businessId: [null],
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
    // TODO Call POST /Holiday
    setTimeout(() => {
      this.isLoading.set(false);
      this.dialog.close(true);
    }, 500);
  }

  close(): void {
    this.dialog.close(false);
  }
}
