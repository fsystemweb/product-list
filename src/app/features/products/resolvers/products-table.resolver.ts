import { DestroyRef, inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, switchMap, of } from 'rxjs';
import { CategoryService } from '../../../services/category.service';
import { Category } from '../../../models/category';
import { ApolloQueryResult } from '@apollo/client/core';
import { CategoryStateService } from '../../../state/category-state.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class ProductsTableResolver implements Resolve<ApolloQueryResult<Category> | null> {
  private categoryService = inject(CategoryService);
  private categoryStateService = inject(CategoryStateService);
  private destroyRef = inject(DestroyRef);

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ApolloQueryResult<Category> | null> {
    const slug = route.paramMap.get('slug') || '';

    return this.categoryStateService.getCategories().pipe(
      takeUntilDestroyed(this.destroyRef),
      switchMap(data => {
        if (!data || !data.items) return of(null);
        const categoryId = data.items.find(category => category.slug === slug)?._id;
        return categoryId ? this.categoryService.getCategory(categoryId) : of(null);
        // TODO: Implement error handling
      })
    );
  }
}
