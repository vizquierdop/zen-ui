import { UISelectModel } from './ui-select.model';

export interface UIFilterModel {
  name: string;
  label: string;
  type:
    | 'string'
    | 'number'
    | 'boolean'
    | 'boolean-active'
    | 'select'
    | 'date'
    | 'autoComplete'
    | 'multi'
    | 'range'
    | 'number-range'
    | 'select-strict';

  // For selectable filters
  values?: UISelectModel[];
  filteredValues?: UISelectModel[];
  selectedOptions?: UISelectModel[];

  // For number range
  min?: number;
  max?: number;
}
