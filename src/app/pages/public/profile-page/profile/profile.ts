import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { UiPageHeader } from '../../../../components/ui-page-header/ui-page-header';
import { UISelectModel } from '../../../../models/basic/ui-select.model';

@Component({
  selector: 'app-public-profile',
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    UiPageHeader,
  ],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class PublicProfile {
  isLoading = signal(false);
  profileForm: FormGroup;

  provinceOptions: UISelectModel[] = [];

  constructor(private readonly fb: FormBuilder) {
    this.profileForm = this.fb.group({
      id: [null],
      firstName: [null, [Validators.required]],
      lastName: [null],
      email: [null, [Validators.required, Validators.email]],
      phone: [null],
      provinceId: [null, [Validators.required]],
    });

    this.loadSelectValues();
  }

  loadSelectValues(): void {
    // TODO Implement loadSelectValues method.
  }

  save(): void {
    // TODO Implement save method.
  }
}
