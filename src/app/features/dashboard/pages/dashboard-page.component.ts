import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MaterialModule } from '../../../vendor/material.module';
import { DashboardCardComponent } from '../components/dashboard-card/dashboard-card.component';
import { CategoriesTableComponent } from '../components/categories-table/categories-table.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MaterialModule, DashboardCardComponent, CategoriesTableComponent],
  standalone: true,
})
export class DashboardPageComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  categoriesTotal = 0;
  productsTotal = 0;

  constructor() {
    this.getResolvedData();
  }

  private getResolvedData(): void {
    const resolvedData = this.route.snapshot.data['resolvedData'];
    this.categoriesTotal = resolvedData.categories.data.total;
    this.productsTotal = resolvedData.products.data.total;
  }
}
