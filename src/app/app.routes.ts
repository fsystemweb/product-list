import { Routes } from '@angular/router';
import { AppInitGuard } from './layout/app-init.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AppInitGuard],
  },
  {
    path: 'products/:slug',
    loadChildren: () => import('./features/products/products.module').then(m => m.ProductsModule),
    canActivate: [AppInitGuard],
  },
];
