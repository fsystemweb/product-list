import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { ProductService } from '../../../services/product.service';
import { DashboardData } from '../models/dashboard-data';
import { LoadingService } from '../../../services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataResolver implements Resolve<DashboardData> {
  private productService = inject(ProductService);
  private loadingService = inject(LoadingService);

  resolve(): Observable<DashboardData> {
    this.loadingService.show();
    return this.productService
      .getProducts()
      .pipe(map(products => ({ products })))
      .pipe(finalize(() => this.loadingService.hide()));
  }
}
