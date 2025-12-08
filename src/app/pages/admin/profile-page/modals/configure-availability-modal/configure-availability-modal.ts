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
import { AvailabilityModel } from '../../../../../models/entities/availability.models';

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

  availabilities: AvailabilityModel[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      availabilities: AvailabilityModel[];
    },
    private readonly dialog: MatDialogRef<ConfigureAvailabilityModal>,
    private readonly fb: FormBuilder
  ) {
    const availabilityForm = this.fb.group({
      id: [null],
      dayOfWeek: [null],
      slot1Start: [null],
      slot1End: [null],
      slot2Start: [null],
      slot2End: [null],
      isActive: [false],
    });

    this.mondayAvailabilityForm = this.createAvailabilityForm();
    this.tuesdayAvailabilityForm = this.createAvailabilityForm();
    this.wednesdayAvailabilityForm = this.createAvailabilityForm();
    this.thursdayAvailabilityForm = this.createAvailabilityForm();
    this.fridayAvailabilityForm = this.createAvailabilityForm();
    this.saturdayAvailabilityForm = this.createAvailabilityForm();
    this.sundayAvailabilityForm = this.createAvailabilityForm();

    this.availabilities = data.availabilities;
  }

  ngOnInit(): void {
    this.mondayAvailabilityForm.patchValue(
      this.data.availabilities.find((availability) => availability.dayOfWeek === 1) ?? {}
    );
    this.tuesdayAvailabilityForm.patchValue(
      this.data.availabilities.find((availability) => availability.dayOfWeek === 2) ?? {}
    );
    this.wednesdayAvailabilityForm.patchValue(
      this.data.availabilities.find((availability) => availability.dayOfWeek === 3) ?? {}
    );
    this.thursdayAvailabilityForm.patchValue(
      this.data.availabilities.find((availability) => availability.dayOfWeek === 4) ?? {}
    );
    this.fridayAvailabilityForm.patchValue(
      this.data.availabilities.find((availability) => availability.dayOfWeek === 5) ?? {}
    );
    this.saturdayAvailabilityForm.patchValue(
      this.data.availabilities.find((availability) => availability.dayOfWeek === 6) ?? {}
    );
    this.sundayAvailabilityForm.patchValue(
      this.data.availabilities.find((availability) => availability.dayOfWeek === 7) ?? {}
    );
  }

  close(): void {
    this.dialog.close(null);
  }

  save(): void {
    // TODO Implement save method.
  }

  private createAvailabilityForm(): FormGroup {
    return this.fb.group({
      id: [null],
      dayOfWeek: [null],
      slot1Start: [null],
      slot1End: [null],
      slot2Start: [null],
      slot2End: [null],
      isActive: [false],
    });
  }
}
