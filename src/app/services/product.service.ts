import { inject, Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { map, Observable } from 'rxjs';
import { Product } from '../models/product';
import { ApolloArray } from '../models/arrays-apollo';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apollo: Apollo = inject(Apollo);

  getProducts(): Observable<ApolloQueryResult<ApolloArray<Product>>> {
    return this.apollo
      .query<{ getProductList: ApolloArray<Product> }>({
        query: gql`
          {
            getProductList {
              items {
                _id
                category {
                  _id
                  name
                  slug
                }
                description
                image
                name
                price
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
          data: result.data.getProductList,
        }))
      );
  }

  getProduct(id: string): Observable<ApolloQueryResult<Product>> {
    const GET_PRODUCT_QUERY = gql`
      query GetProduct($id: ID!) {
        getProduct(id: $id) {
          slug
          name
          description
          image
          price
          category {
            name
          }
        }
      }
    `;

    return this.apollo
      .query<{ getProduct: Product }>({
        query: GET_PRODUCT_QUERY,
        variables: { id },
      })
      .pipe(
        map(
          (result): ApolloQueryResult<Product> => ({
            ...result,
            data: result.data.getProduct,
          })
        )
      );
  }
}
