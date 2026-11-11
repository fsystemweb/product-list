import { inject, Injectable } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../models/product';
import { ApolloArray } from '../models/arrays-apollo';
import {
  GetProductBySlugDocument,
  GetProductDocument,
  GetProductRecommendationsDocument,
  GetProductsDocument,
} from '../graphql/generated';
import type {
  GetProductBySlugQueryVariables,
  GetProductRecommendationsQueryVariables,
} from '../graphql/generated';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apollo: Apollo = inject(Apollo);

  getProducts(): Observable<ApolloQueryResult<ApolloArray<Product>>> {
    return this.apollo.query({ query: GetProductsDocument }).pipe(
      map(result => ({
        ...result,
        data: result.data?.getProductList as ApolloArray<Product>,
      }))
    );
  }

  getProduct(id: string): Observable<ApolloQueryResult<Product>> {
    return this.apollo
      .query({
        query: GetProductDocument,
        variables: { _id: id },
      })
      .pipe(
        map(result => ({
          ...result,
          data: result.data?.getProduct as Product,
        }))
      );
  }

  getProductBySlug(slug: string): Observable<ApolloQueryResult<Product>> {
    const variables: GetProductBySlugQueryVariables = {
      where: {
        slug: {
          eq: slug,
        },
      },
    };
    return this.apollo.query({ query: GetProductBySlugDocument, variables }).pipe(
      map(result => ({
        ...result,
        data: result.data?.getProductList.items[0] as Product,
      }))
    );
  }

  getProductRecommendations(
    categoryId: string,
    excludeId: string,
    size: number = 3
  ): Observable<ApolloQueryResult<ApolloArray<Product>>> {
    const variables: GetProductRecommendationsQueryVariables = {
      where: {
        category: {
          _id: {
            eq: categoryId,
          },
        },
        NOT: {
          _id: {
            eq: excludeId,
          },
        },
      },
      size: size,
    };
    return this.apollo.query({ query: GetProductRecommendationsDocument, variables }).pipe(
      map(result => ({
        ...result,
        // The recommendations query selects only `items`, not `total`.
        data: result.data?.getProductList as unknown as ApolloArray<Product>,
      }))
    );
  }
}
