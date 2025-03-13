import { inject, Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProductService } from '../../../services/product.service';
import { DashboardData } from '../models/dashboard-data';

@Injectable({
  providedIn: 'root',
})
export class DashboardDataResolver implements Resolve<DashboardData> {
  private productService = inject(ProductService);

  resolve(): Observable<DashboardData> {
    return this.productService.getProducts().pipe(map(products => ({ products })));
  }
}
