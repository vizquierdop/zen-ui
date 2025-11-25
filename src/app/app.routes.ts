import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/base/base').then((m) => m.Base),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/base/admin-base').then((m) => m.AdminBase),
    children: [
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/admin/profile-page/profile/profile').then((m) => m.AdminProfile),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./pages/admin/services-page/services-list/services-list').then(
            (m) => m.AdminServicesList
          ),
      },
      {
        path: 'reservations',
        loadComponent: () =>
          import('./pages/admin/reservations-page/reservations-list/reservations-list').then(
            (m) => m.AdminReservationsList
          ),
      },
      {
        path: 'reservations/create',
        loadComponent: () =>
          import('./pages/admin/reservations-page/reservations-create/reservations-create').then(
            (m) => m.AdminReservationsCreate
          ),
      },
      {
        path: 'calendar',
        loadComponent: () =>
          import('./pages/admin/calendar-page/calendar/calendar').then((m) => m.AdminCalendar),
      },
      {
        path: 'holidays',
        loadComponent: () =>
          import('./pages/admin/holidays-page/holidays/holidays').then((m) => m.AdminHolidays),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/authentication/login-page/login').then((m) => m.Login),
  }
];
