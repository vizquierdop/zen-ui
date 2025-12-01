import { UIFilterModel } from '../../../../models/basic/ui-filter.model';

export const ReservationFilters: UIFilterModel[] = [
  {
    name: 'customerName',
    label: 'Customer Name',
    type: 'string',
  },
  {
    name: 'customerEmail',
    label: 'Customer Email',
    type: 'string',
  },
  {
    name: 'customerPhone',
    label: 'Customer Phone',
    type: 'string',
  },
  {
    name: '',
    label: 'Reservation Date',
    type: 'range',
  },
  {
    name: 'startTime',
    label: 'Start Time',
    type: 'string',
  },
  {
    name: 'endTime',
    label: 'End Time',
    type: 'string',
  },
  {
    name: 'statusTypes',
    label: 'Status',
    type: 'multi',
    values: [],
    selectedOptions: [],
  },
  {
    name: 'serviceIds',
    label: 'Services',
    type: 'multi',
    values: [],
    selectedOptions: [],
    filteredValues: [],
  },
];
