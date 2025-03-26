import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { MaterialModule } from '../../../vendor/material.module';
import { DashboardCardComponent } from '../components/dashboard-card/dashboard-card.component';
import { CategoriesTableComponent } from '../components/categories-table/categories-table.component';
import { ActivatedRoute } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CategoryStateService } from '../../../state/category-state.service';

@Component({
  templateUrl: './dashboard-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MaterialModule, DashboardCardComponent, CategoriesTableComponent],
})
export class DashboardPageComponent {
  private route: ActivatedRoute = inject(ActivatedRoute);
  private categoryStateService = inject(CategoryStateService);
  private destroyRef = inject(DestroyRef);

  categoriesTotal = 0;
  productsTotal = 0;

  constructor() {
    this.getResolvedData();
    this.setCategoriesTotal();
  }

  private getResolvedData(): void {
    const resolvedData = this.route.snapshot.data['resolvedData'];
    this.productsTotal = resolvedData.products.data.total;
  }

  private setCategoriesTotal(): void {
    this.categoryStateService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        if (!data) return;
        this.categoriesTotal = data.total;
      });
  }
}
