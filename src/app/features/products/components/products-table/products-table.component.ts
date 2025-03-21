import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { MaterialModule } from '../../../../vendor/material.module';
import { ProductsHeadComponent } from '../products-head/products-head.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from '../../../../models/product';
import { ProductImagePipe } from '../../../../pipe/product-image.pipe';
import { catchError, map, of, switchMap } from 'rxjs';
import { CategoryStateService } from '../../../../state/category-state.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-products-table',
  imports: [CommonModule, MaterialModule, ProductsHeadComponent, ProductImagePipe],
  templateUrl: './products-table.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsTableComponent {
  private router: Router = inject(Router);
  private route: ActivatedRoute = inject(ActivatedRoute);
  private categoryStateService = inject(CategoryStateService);
  private destroyRef = inject(DestroyRef);

  displayedColumns: string[] = ['image', 'name', 'price'];
  dataSource: Product[] = [];

  categoryName$ = this.route.params.pipe(
    map(params => params['slug'] || ''),
    switchMap(slug =>
      this.categoryStateService.getCategories().pipe(
        map(categories => {
          const category = categories.items.find(c => c.slug === slug);
          return category?.name || '';
        })
      )
    ),
    catchError(error => {
      return of('');
    })
  );

  constructor() {
    this.getResolvedData();
  }

  onRowClick(row: Product): void {
    this.router.navigate(['./product-view', row.slug], { relativeTo: this.route });
  }

  private getResolvedData(): void {
    this.route.data.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(data => {
      this.dataSource = data['resolvedData']?.data?.products || [];
    });
  }
}
