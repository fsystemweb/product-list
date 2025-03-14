import { inject, Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';
import { ApolloArray } from '../models/arrays-apollo';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apollo: Apollo = inject(Apollo);

  private readonly GET_CATEGORIES = gql`
    query GetCategories {
      getCategoryList {
        items {
          _id
          name
          products {
            _id
            description
            name
            price
            slug
          }
          slug
        }
        total
      }
    }
  `;

  private readonly GET_CATEGORY = gql`
    query GetCategory($_id: ID!) {
      getCategory(_id: $_id) {
        _id
        name
        products {
          _id
          description
          image
          name
          price
          slug
        }
        slug
      }
    }
  `;

  getCategories(): Observable<ApolloQueryResult<ApolloArray<Category>>> {
    return this.apollo
      .query<{ getCategoryList: ApolloArray<Category> }>({
        query: this.GET_CATEGORIES,
      })
      .pipe(
        map(result => ({
          ...result,
          data: result.data.getCategoryList,
        }))
      );
  }

  getCategory(id: string): Observable<ApolloQueryResult<Category>> {
    return this.apollo
      .query<{ getCategory: Category }>({
        query: this.GET_CATEGORY,
        variables: {
          _id: id,
        },
      })
      .pipe(
        map(result => ({
          ...result,
          data: result.data.getCategory,
        }))
      );
  }
}
