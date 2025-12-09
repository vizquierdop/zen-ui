import { CommonModule, DatePipe } from '@angular/common';
import { Component, effect, Inject, signal } from '@angular/core';
import { ReactiveFormsModule, FormsModule, FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { UIFilterModel } from '../../models/basic/ui-filter.model';
import { UISelectModel } from '../../models/basic/ui-select.model';

@Component({
  selector: 'app-filters-modal',
  imports: [
    CommonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    MatAutocompleteModule,
    MatChipsModule,
    MatSliderModule,
  ],
  providers: [DatePipe],
  templateUrl: './filters-modal.html',
  styleUrl: './filters-modal.scss',
})
export class FiltersModal {
  filtersList: any[];
  currentFilters: { [key: string]: any };

  filtersForm = new FormGroup({});

  multiSelectFilters = signal<UIFilterModel[]>([]);
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      filtersList: any[];
      currentFilters: { [key: string]: any };
    },
    public dialogRef: MatDialogRef<FiltersModal>,
    private datePipe: DatePipe
  ) {
    this.filtersList = this.data.filtersList;
    this.currentFilters = this.data.currentFilters;
    effect(() => {
      this.multiSelectFilters().forEach((f) => {
        this.filtersForm.get(f.name)?.valueChanges.subscribe((val) => {
          this.filterOptions(f);
        });
      });
    });

    this.filtersList.forEach((filter) => {
      if (filter.type === 'range') {
        this.filtersForm.addControl(`Start${filter.name}`, new FormControl());
        this.filtersForm.addControl(`End${filter.name}`, new FormControl());
      } else if (filter.type === 'number-range') {
        this.filtersForm.addControl(`${filter.name}Start`, new FormControl());
        this.filtersForm.addControl(`${filter.name}End`, new FormControl());
      } else {
        this.filtersForm.addControl(filter.name, new FormControl());
      }
      if (filter.type === 'autoComplete') {
        this.multiSelectFilters.update((val) => [...val, filter]);
      }
    });
    Object.keys(this.currentFilters).forEach((key) => {
      const formField = this.filtersForm.get(key);
      if (formField) {
        const isMulti = this.multiSelectFilters().find((f) => f.name === key);
        if (!isMulti) {
          formField.setValue(this.currentFilters[key]);
        }
      }
    });
    this.multiSelectFilters().forEach((multi) => {
      if (!this.currentFilters[multi.name]) {
        multi.selectedOptions = [];
      }
    });
  }

  addChip(filter: UIFilterModel, element: UISelectModel): void {
    if (filter.selectedOptions) {
      filter.selectedOptions.push(element);
      const inputRef = document.getElementById(`input${filter.name}`) as HTMLInputElement;
      if (inputRef) {
        inputRef.value = '';
        this.filtersForm.get(filter.name)?.setValue(null);
      }
    }
  }

  removeChip(filter: UIFilterModel, element: UISelectModel): void {
    if (filter.selectedOptions) {
      filter.selectedOptions.splice(filter.selectedOptions.indexOf(element), 1);
      this.filterOptions(filter);
    }
  }

  filterOptions(filter: UIFilterModel): void {
    const inputRef = document.getElementById(`input${filter.name}`) as HTMLInputElement;
    const filterValue = inputRef.value.toLowerCase();
    if (filter.values) {
      filter.filteredValues = filter.values.filter((o) => {
        const isAdded = filter.selectedOptions?.map((x: UISelectModel) => x.value).includes(o.value);
        return o.label.toLowerCase().includes(filterValue) && !isAdded;
      });
    }
  }

  clearAutocomplete(filter: UIFilterModel): void {
    const inputRef = document.getElementById(`input${filter.name}`) as HTMLInputElement;
    inputRef.value = '';
    this.filtersForm.get(filter.name)?.setValue(null);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  clearFilters(): void {
    this.filtersForm.reset();
    this.multiSelectFilters().forEach((multi) => {
      multi.selectedOptions = [];
    });
  }

  sendFilters(): void {
    const filters: { [key: string]: any } = {};
    Object.keys(this.filtersForm.value).forEach((key) => {
      if (this.filtersForm.get(key)?.value !== null) {
        if (this.filtersForm.get(key)?.value instanceof Date) {
          filters[key] = this.datePipe.transform(this.filtersForm.get(key)?.value, 'yyyy-MM-dd');
        } else {
          filters[key] = this.filtersForm.get(key)?.value;
        }
      }
    });
    this.multiSelectFilters().forEach((multi) => {
      if (multi.selectedOptions && multi.selectedOptions.length > 0) {
        filters[multi.name] = multi.selectedOptions.map((x: UISelectModel) => x.value);
      }
      this.filtersForm.get(multi.name)?.setValue(null);
    });
    this.dialogRef.close(filters);
  }

  manageNumberRangeDisplay(ref: string, display: boolean) {
    const el = document.getElementById(ref) as HTMLElement;
    display = !display;
  }
}
