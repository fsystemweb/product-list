import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoryService } from '../../../services/category.service';
import { ProductService } from '../../../services/product.service';
import { DashboardData } from '../models/dashboard-data';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataResolver implements Resolve<DashboardData> {
  private categoryService = inject(CategoryService);
  private productService = inject(ProductService);

  resolve(): Observable<DashboardData> {
    return forkJoin({
      products: this.productService.getProducts(),
      categories: this.categoryService.getCategories(),
    }).pipe(
      map(responses => ({
        products: responses.products,
        categories: responses.categories,
      }))
    );
  }
}
