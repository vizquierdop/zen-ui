import { DatePipe, KeyValue } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { UIFilterModel } from '../../models/basic/ui-filter.model';

@Pipe({
  name: 'filtersChipsPipe',
  standalone: true,
  pure: false,
})
export class FiltersChipPipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(filter: KeyValue<String, any>, filters: UIFilterModel[]): string {
    let result = '';
    const filterObj = filters.find(
      (f) =>
        f.name === filter.key || `${f.name}Start` === filter.key || `${f.name}End` === filter.key
    );
    if (filterObj) {
      result += filterObj.label;
      if (filterObj.type === 'range') {
        if (filter.key === `${filterObj.name}Start`) {
          result += ' (Start)';
        } else if (filter.key === `${filterObj.name}End`) {
          result += ' (End)';
        }
        result += ': ' + this.datePipe.transform(filter.value, 'dd/MM/yyyy');
      } else if (filterObj.type === 'number-range') {
        if (filter.key === `${filterObj.name}Start`) {
          result += ' (Start)';
        } else if (filter.key === `${filterObj.name}End`) {
          result += ' (End)';
        }
        result += ': ' + filter.value;
      } else if (filterObj.type === 'string' || filterObj.type === 'number') {
        result += ': ' + filter.value;
      } else if (filterObj.type === 'date') {
        result += ': ' + this.datePipe.transform(filter.value, 'dd/MM/yyyy');
      } else if (filterObj.type === 'boolean') {
        result += ': ' + (filter.value ? 'Yes' : 'No');
      } else if (filterObj.type === 'multi' || filterObj.type === 'autoComplete') {
        let labels = '';
        filter.value.forEach((o: number, i: number) => {
          const label = filterObj.values?.find((v) => v.value === o)?.label;
          labels += label;
          if (i !== filter.value.length - 1) {
            labels += ' / ';
          }
        });
        result += ': ' + labels;
      } else if (filterObj.type === 'select' || filterObj.type === 'select-strict') {
        const label = filterObj.values?.find((v) => v.value === filter.value)?.label;
        result += ': ' + label;
      }
    }
    return result;
  }
}
