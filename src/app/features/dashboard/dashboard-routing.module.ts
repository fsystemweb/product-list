import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { DashboardDataResolver } from './resolvers/dashboard-data.resolver';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
    resolve: { resolvedData: DashboardDataResolver },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
