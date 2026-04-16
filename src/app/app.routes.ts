import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'settings',
    loadChildren: () => import('./settings/settings.routes').then((m) => m.settingRoutes),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
