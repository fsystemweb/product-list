import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ApolloQueryResult } from '@apollo/client/core';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsViewResolver implements Resolve<ApolloQueryResult<Product> | null> {
  private productService = inject(ProductService);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ApolloQueryResult<Product> | null> {
    const id = route.paramMap.get('id') || '';

    return this.productService.getProduct(id);
  }
}
