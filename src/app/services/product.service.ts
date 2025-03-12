import { inject, Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apollo: Apollo = inject(Apollo);

  getProduct(slug: string): Observable<ApolloQueryResult<Product>> {
    return this.apollo.query({
      query: gql`
        query GetProduct($slug: String!) {
          product(slug: $slug) {
            slug
            name
            image
            description
            price
          }
        }
      `,
      variables: {
        slug: slug,
      },
    });
  }
}
