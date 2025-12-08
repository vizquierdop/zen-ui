import { Routes } from '@angular/router';
import { AuthGuard } from './utils/guards/auth.guard';
import { RolesGuard } from './utils/guards/roles.guard';
import { RoleType } from './models/enums/role.enum';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/base/base').then((m) => m.Base),
    children: [
      {
        path: '',
        redirectTo: '/public',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/base/admin-base').then((m) => m.AdminBase),
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: [RoleType.ADMIN, RoleType.BUSINESS] },
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
    path: 'public',
    loadComponent: () => import('./pages/public/base/public-base').then((m) => m.PublicBase),
    canActivate: [AuthGuard, RolesGuard],
    data: { roles: [RoleType.ADMIN, RoleType.CUSTOMER] },
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/public/home-page/home/home').then((m) => m.PublicHome),
      },
      {
        path: 'categories',
        loadComponent: () =>
          import('./pages/public/categories-page/categories-list/categories-list').then(
            (m) => m.PublicCategoriesList
          ),
      },
      {
        path: 'profile',
        loadComponent: () =>
          import('./pages/public/profile-page/profile/profile').then((m) => m.PublicProfile),
      },
      {
        path: 'reservations',
        loadComponent: () =>
          import('./pages/public/reservations-page/reservations-list/reservations-list').then(
            (m) => m.PublicReservationsList
          ),
      },
      {
        path: 'services',
        loadComponent: () =>
          import('./pages/public/services-page/services-list/services-list').then(
            (m) => m.PublicServicesList
          ),
      },
      {
        path: 'businesses',
        loadComponent: () =>
          import('./pages/public/businesses-page/businesses-list/businesses-list').then(
            (m) => m.PublicBusinessesList
          ),
      },
      {
        path: 'businesses/:id',
        loadComponent: () =>
          import('./pages/public/businesses-page/business-detail/business-detail').then(
            (m) => m.PublicBusinessDetail
          ),
      },
    ],
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/authentication/login-page/login').then((m) => m.Login),
  },
  {
    path: 'logout',
    loadComponent: () =>
      import('./pages/authentication/logout-page/logout').then((m) => m.Logout),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/authentication/register-page/register').then((m) => m.Register),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
