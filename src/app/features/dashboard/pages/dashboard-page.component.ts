import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MaterialModule } from '../../../vendor/material.module';
import { DashboardCardComponent } from '../components/dashboard-card/dashboard-card.component';
import { CategoriesTableComponent } from '../components/categories-table/categories-table.component';

@Component({
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MaterialModule, DashboardCardComponent, CategoriesTableComponent],
  standalone: true,
})
export class DashboardPageComponent {}
