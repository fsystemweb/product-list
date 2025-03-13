import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';
import { ApolloArray } from '../models/arrays-apollo';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class CategoryStateService {
  private categoryService: CategoryService = inject(CategoryService);
  private destroyRef = inject(DestroyRef);

  private categoriesSubject = new BehaviorSubject<ApolloArray<Category> | null>(null);
  categories$: Observable<ApolloArray<Category> | null> = this.categoriesSubject.asObservable();

  getCategories(): Observable<ApolloArray<Category>> {
    return this.categories$ as Observable<ApolloArray<Category>>;
  }

  loadCategories(): void {
    // TODO: Handle errors
    this.categoryService
      .getCategories()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(result => {
        this.categoriesSubject.next(result.data);
      });
  }
}
