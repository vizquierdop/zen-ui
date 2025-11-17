import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/base/base').then((m) => m.Base),
  },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/admin-base/admin-base').then((m) => m.AdminBase),
  },
];
