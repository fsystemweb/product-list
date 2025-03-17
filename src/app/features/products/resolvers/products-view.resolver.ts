import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { concatMap, finalize, map, Observable } from 'rxjs';
import { ProductService } from '../../../services/product.service';
import { LoadingService } from '../../../services/loading.service';
import { ProductsViewDataResolver } from '../models/product-view-data-resolver';

@Injectable({
  providedIn: 'root',
})
export class ProductsViewResolver implements Resolve<ProductsViewDataResolver> {
  private productService = inject(ProductService);
  private loadingService = inject(LoadingService);
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ProductsViewDataResolver> {
    const slug = route.paramMap.get('slug') || '';
    this.loadingService.show();

    return this.productService.getProductBySlug(slug).pipe(
      concatMap(product =>
        this.productService
          .getProductRecommendations(product.data.category._id, product.data._id)
          .pipe(
            map(recommendations => ({
              product: product.data,
              recommendations: recommendations.data.items,
            })),
            finalize(() => this.loadingService.hide())
          )
      )
    );
  }
}
