import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DashboardPageComponent } from './pages/dashboard-page.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [DashboardRoutingModule, CommonModule, DashboardPageComponent],
})
export class DashboardModule {}
