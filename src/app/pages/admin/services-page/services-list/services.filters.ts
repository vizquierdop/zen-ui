import { UIFilterModel } from '../../../../models/basic/ui-filter.model';

export const ServiceFilters: UIFilterModel[] = [
  {
    name: 'name',
    label: 'Name',
    type: 'string',
  },
  {
    name: 'duration',
    label: 'Duration',
    type: 'number',
  },
  {
    name: 'price',
    label: 'Price',
    type: 'number',
  },
  {
    name: 'active',
    label: 'Active',
    type: 'boolean',
  },
];
