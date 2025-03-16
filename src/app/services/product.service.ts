import { inject, Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { ApolloArray } from '../models/arrays-apollo';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apollo: Apollo = inject(Apollo);

  private readonly GET_PRODUCTS = gql`
    query GetProducts {
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
  `;

  private readonly GET_PRODUCT = gql`
    query GetProduct($_id: ID!) {
      getProduct(_id: $_id) {
        _id
        slug
        name
        description
        image
        price
        category {
          _id
          name
          slug
        }
      }
    }
  `;

  private readonly GET_PRODUCT_BY_SLUG = gql`
    query ($where: TSWhereProductInput!) {
      getProductList(where: $where) {
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
      }
    }
  `;

  getProducts(): Observable<ApolloQueryResult<ApolloArray<Product>>> {
    return this.apollo
      .query<{ getProductList: ApolloArray<Product> }>({
        query: this.GET_PRODUCTS,
      })
      .pipe(
        map(result => ({
          ...result,
          data: result.data.getProductList,
        }))
      );
  }

  getProduct(id: string): Observable<ApolloQueryResult<Product>> {
    return this.apollo
      .query<{ getProduct: Product }>({
        query: this.GET_PRODUCT,
        variables: { _id: id },
      })
      .pipe(
        map(result => ({
          ...result,
          data: result.data.getProduct,
        }))
      );
  }

  getProductBySlug(slug: string): Observable<ApolloQueryResult<Product>> {
    return this.apollo
      .query<{ getProductList: ApolloArray<Product> }>({
        query: this.GET_PRODUCT_BY_SLUG,
        variables: {
          where: {
            slug: {
              eq: slug,
            },
          },
        },
      })
      .pipe(
        map(result => ({
          ...result,
          data: result.data.getProductList.items[0],
        }))
      );
  }
}
