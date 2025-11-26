import { UISectionModel } from '../models/basic/ui-section.model';
import { RoleType } from '../models/enums/role.enum';
import { UISectionKeysEnum } from '../models/enums/section-keys.enum';

export const AdminUISections: UISectionModel[] = [
  {
    key: UISectionKeysEnum.ADMIN_PROFILE,
    label: 'Profile',
    route: 'profile',
    class: 'list-item',
    icon: 'person',
    roles: [RoleType.ADMIN, RoleType.BUSINESS],
  },
  {
    key: UISectionKeysEnum.ADMIN_SERVICES,
    label: 'Services',
    route: 'services',
    class: 'list-item',
    icon: 'list',
    roles: [RoleType.ADMIN, RoleType.BUSINESS],
  },
  {
    key: UISectionKeysEnum.ADMIN_CALENDAR,
    label: 'Calendar',
    route: 'calendar',
    class: 'list-item',
    icon: 'calendar_today',
    roles: [RoleType.ADMIN, RoleType.BUSINESS],
  },
  {
    key: UISectionKeysEnum.ADMIN_RESERVATIONS,
    label: 'Reservations',
    route: 'reservations',
    class: 'list-item',
    icon: 'book_5',
    roles: [RoleType.ADMIN, RoleType.BUSINESS],
  },
  {
    key: UISectionKeysEnum.ADMIN_HOLIDAYS,
    label: 'Holidays',
    route: 'holidays',
    class: 'list-item',
    icon: 'sunny',
    roles: [RoleType.ADMIN, RoleType.BUSINESS],
  },
];

export const PublicUISections: UISectionModel[] = [
  {
    key: UISectionKeysEnum.PUBLIC_PROFILE,
    label: 'Profile',
    route: 'profile',
    class: 'list-item',
    roles: [RoleType.ADMIN, RoleType.CUSTOMER],
  },
  {
    key: UISectionKeysEnum.PUBLIC_RESERVATIONS,
    label: 'Reservations',
    route: 'reservations',
    class: 'list-item',
    roles: [RoleType.ADMIN, RoleType.CUSTOMER],
  },
  {
    key: UISectionKeysEnum.PUBLIC_SERVICES,
    label: 'Services',
    route: 'services',
    class: 'list-item',
    roles: [RoleType.ADMIN, RoleType.CUSTOMER],
  },
  {
    key: UISectionKeysEnum.PUBLIC_BUSINESSES,
    label: 'Businesses',
    route: 'businesses',
    class: 'list-item',
    roles: [RoleType.ADMIN, RoleType.CUSTOMER],
  }
];