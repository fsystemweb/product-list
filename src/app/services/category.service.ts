import { inject, Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';
import { ApolloArray } from '../models/arrays-apollo';
import { GetCategoriesDocument, GetCategoryDocument } from '../graphql/generated';
import type { GetCategoryQueryVariables } from '../graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apollo: Apollo = inject(Apollo);

  getCategories(): Observable<ApolloQueryResult<ApolloArray<Category>>> {
    return this.apollo.query({ query: GetCategoriesDocument }).pipe(
      map(result => ({
        ...result,
        data: result.data?.getCategoryList as ApolloArray<Category>,
      }))
    );
  }

  getCategory(id: string): Observable<ApolloQueryResult<Category>> {
    const variables: GetCategoryQueryVariables = {
      _id: id,
    };
    return this.apollo.query({ query: GetCategoryDocument, variables }).pipe(
      map(result => ({
        ...result,
        data: result.data?.getCategory as Category,
      }))
    );
  }
}
