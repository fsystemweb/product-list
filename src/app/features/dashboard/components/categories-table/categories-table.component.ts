import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';
import { Router } from '@angular/router';
import { Category } from '../../../../models/category';
import { CategoryStateService } from '../../../../state/category-state.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-categories-table',
  imports: [CommonModule, MaterialModule],
  templateUrl: './categories-table.component.html',
})
export class CategoriesTableComponent {
  private router: Router = inject(Router);
  private categoryStateService = inject(CategoryStateService);
  private destroyRef = inject(DestroyRef);

  displayedColumns: string[] = ['name', 'products'];
  dataSource: Category[] = [];

  loading = false;

  constructor() {
    this.getCategory();
  }

  onRowClick(row: Category): void {
    this.router.navigate(['/products', row.slug]);
  }

  private getCategory(): void {
    this.categoryStateService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(data => {
        if (!data) return;
        this.dataSource = data.items;
      });
  }
}
