import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@Component({
  selector: 'app-configure-availability-modal',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  templateUrl: './configure-availability-modal.html',
  styleUrl: './configure-availability-modal.scss',
})
export class ConfigureAvailabilityModal implements OnInit {
  isLoading = signal(false);
  mondayAvailabilityForm: FormGroup;
  tuesdayAvailabilityForm: FormGroup;
  wednesdayAvailabilityForm: FormGroup;
  thursdayAvailabilityForm: FormGroup;
  fridayAvailabilityForm: FormGroup;
  saturdayAvailabilityForm: FormGroup;
  sundayAvailabilityForm: FormGroup;

  constructor(
    private readonly dialog: MatDialogRef<ConfigureAvailabilityModal>,
    // @Inject(MAT_DIALOG_DATA) public data: {

    // }
    private readonly fb: FormBuilder,
  ) {
    const availabilityForm = this.fb.group({
      id: [null],
      dayOfWeek: [null],
      slot1Start: [null],
      slot1End: [null],
      slot2Start: [null],
      slot2End: [null],
      active: [false],
    });
    this.mondayAvailabilityForm = availabilityForm;
    this.tuesdayAvailabilityForm = availabilityForm;
    this.wednesdayAvailabilityForm = availabilityForm;
    this.thursdayAvailabilityForm = availabilityForm;
    this.fridayAvailabilityForm = availabilityForm;
    this.saturdayAvailabilityForm = availabilityForm;
    this.sundayAvailabilityForm = availabilityForm;
  }

  ngOnInit(): void {
    
  }

  close(): void {
    this.dialog.close(null);
  }

  save(): void {
    // TODO Implement save method.
  }
}
