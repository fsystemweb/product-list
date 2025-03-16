import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { finalize, Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';
import { LoadingService } from '../../../services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsViewResolver implements Resolve<ApolloQueryResult<Product> | null> {
  private productService = inject(ProductService);
  private loadingService = inject(LoadingService);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ApolloQueryResult<Product> | null> {
    this.loadingService.show();
    const slug = route.paramMap.get('slug') || '';

    return this.productService
      .getProductBySlug(slug)
      .pipe(finalize(() => this.loadingService.hide()));
  }
}
