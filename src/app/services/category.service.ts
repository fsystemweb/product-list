import { inject, Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apollo: Apollo = inject(Apollo);

  getCategories(): Observable<ApolloQueryResult<{ getCategoryList: { items: Category[] } }>> {
    return this.apollo.query({
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
    });
  }

  getCategory(slug: string): Observable<ApolloQueryResult<Category>> {
    return this.apollo.query({
      query: gql`
        query GetCategory($slug: String!) {
          category(slug: $slug) {
            slug
            name
            products {
              slug
              name
              image
              description
              price
            }
          }
        }
      `,
      variables: {
        slug: slug,
      },
    });
  }
}
