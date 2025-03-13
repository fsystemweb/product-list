import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { ApolloQueryResult } from '@apollo/client/core';

@Injectable({
  providedIn: 'root',
})
export class ProductsTableResolver implements Resolve<ApolloQueryResult<Category>> {
  private categoryService = inject(CategoryService);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ApolloQueryResult<Category>> {
    const slug = route.paramMap.get('slug') || '';
    return this.categoryService.getCategory(slug);
  }
}
