import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';
import { Router } from '@angular/router';
import { CategoryService } from '../../../../services/category.service';
import { ErrorHandlerService } from '../../../../services/error-handler.service';
import { Category } from '../../../../models/category';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-categories-table',
  imports: [CommonModule, MaterialModule],
  templateUrl: './categories-table.component.html',
})
export class CategoriesTableComponent {
  private router: Router = inject(Router);
  private categoryService = inject(CategoryService);
  private errorHandlerService = inject(ErrorHandlerService);
  private ref = inject(ChangeDetectorRef);
  private destroyRef = inject(DestroyRef);

  displayedColumns: string[] = ['name', 'products'];
  dataSource: Category[] = [];

  loading = false;

  constructor() {
    this.fetchCategory();
  }

  onRowClick(row: Category): void {
    this.router.navigate(['/products', row.slug]);
  }

  private fetchCategory(): void {
    this.loading = true;
    this.categoryService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: ({ data }) => {
          this.dataSource = data.getCategoryList.items;
        },
        error: error => {
          this.errorHandlerService.handleError(error);
        },
        complete: () => {
          this.loading = false;
          this.ref.markForCheck();
        },
      });
  }
}
