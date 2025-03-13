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

  getCategories(): Observable<ApolloQueryResult<ApolloArray<Category>>> {
    return this.apollo
      .query<{ getCategoryList: ApolloArray<Category> }>({
        query: gql`
          {
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
        `,
      })
      .pipe(
        map(result => ({
          ...result,
          data: result.data.getCategoryList,
        }))
      );
  }

  getCategory(slug: string): Observable<ApolloQueryResult<Category>> {
    return this.apollo.query({
      query: gql`
        query ($_id: ID!) {
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
      `,
      variables: {
        _id: slug,
      },
    });
  }
}
