import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, finalize, Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { ApolloArray } from '../models/arrays-apollo';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { LoadingService } from '../services/loading.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryStateService {
  private categoryService: CategoryService = inject(CategoryService);
  private destroyRef = inject(DestroyRef);
  private loadingService = inject(LoadingService);

  private categoriesSubject = new BehaviorSubject<ApolloArray<Category> | null>(null);
  categories$: Observable<ApolloArray<Category> | null> = this.categoriesSubject.asObservable();

  getCategories(): Observable<ApolloArray<Category>> {
    return this.categories$ as Observable<ApolloArray<Category>>;
  }

  loadCategories(): void {
    this.loadingService.show();
    this.categoryService
      .getCategories()
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        finalize(() => this.loadingService.hide())
      )
      .subscribe(result => {
        this.categoriesSubject.next(result.data);
      });
  }
}
