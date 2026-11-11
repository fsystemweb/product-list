import { ApolloLink } from '@apollo/client/core';
import type { FetchResult } from '@apollo/client/core';
import { MockLink, type MockedResponse } from '@apollo/client/testing/core';
import {
  GetCategoriesDocument,
  GetCategoryDocument,
  GetProductBySlugDocument,
  GetProductDocument,
  GetProductRecommendationsDocument,
  GetProductsDocument,
} from './generated';
import type {
  GetCategoriesQuery,
  GetCategoryQuery,
  GetCategoryQueryVariables,
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables,
  GetProductQuery,
  GetProductQueryVariables,
  GetProductRecommendationsQuery,
  GetProductRecommendationsQueryVariables,
  GetProductsQuery,
} from './generated';
import {
  demoCategories,
  demoProducts,
  findProductById,
  findProductBySlugFilter,
  productBriefInCategory,
  productDetail,
  productInCategoryDetail,
  productListItem,
  productsOfCategory,
  recommendationCandidates,
} from './demo-data';

/**
 * Builds the Apollo link that answers every operation defined in
 * `src/app/graphql/*.graphql` with deterministic demo data.
 *
 * Used in two places:
 * - as the dedicated "demo mode" link when the backend is not configured, or
 *   when `environment.graphqlMockMode` is enabled,
 * - as the fallback link used by `DemoFallbackLink` when the live backend is
 *   unreachable (see `apollo.config.ts`).
 */
const createDemoLink = (): ApolloLink =>
  new MockLink([
    responseProducts(),
    responseProduct(),
    responseProductBySlug(),
    responseProductRecommendations(),
    responseCategories(),
    responseCategory(),
  ]);

const responseProducts = (): MockedResponse<GetProductsQuery> => ({
  request: { query: GetProductsDocument },
  result: {
    data: {
      getProductList: {
        items: demoProducts.map(productListItem),
        total: demoProducts.length,
      },
    },
  },
});

const responseProduct = (): MockedResponse<GetProductQuery, GetProductQueryVariables> => ({
  request: { query: GetProductDocument },
  variableMatcher: () => true,
  result: (variables: GetProductQueryVariables): FetchResult<GetProductQuery> => {
    const product = findProductById(variables._id);
    return { data: { getProduct: product ? productDetail(product) : null } };
  },
});

const responseProductBySlug = (): MockedResponse<
  GetProductBySlugQuery,
  GetProductBySlugQueryVariables
> => ({
  request: { query: GetProductBySlugDocument },
  variableMatcher: () => true,
  result: (variables: GetProductBySlugQueryVariables): FetchResult<GetProductBySlugQuery> => {
    const product = findProductBySlugFilter(variables);
    return {
      data: {
        getProductList: {
          items: product ? [productListItem(product)] : [],
        },
      },
    };
  },
});

const responseProductRecommendations = (): MockedResponse<
  GetProductRecommendationsQuery,
  GetProductRecommendationsQueryVariables
> => ({
  request: { query: GetProductRecommendationsDocument },
  variableMatcher: () => true,
  result: (variables: GetProductRecommendationsQueryVariables) => ({
    data: {
      getProductList: {
        items: recommendationCandidates(variables).map(productListItem),
      },
    },
  }),
});

const responseCategories = (): MockedResponse<GetCategoriesQuery> => ({
  request: { query: GetCategoriesDocument },
  result: {
    data: {
      getCategoryList: {
        items: demoCategories.map(category => ({
          _id: category._id,
          name: category.name,
          slug: category.slug,
          products: productsOfCategory(category).map(productBriefInCategory),
        })),
        total: demoCategories.length,
      },
    },
  },
});

const responseCategory = (): MockedResponse<GetCategoryQuery, GetCategoryQueryVariables> => ({
  request: { query: GetCategoryDocument },
  variableMatcher: () => true,
  result: (variables: GetCategoryQueryVariables): FetchResult<GetCategoryQuery> => {
    const category = demoCategories.find(c => c._id === variables._id);
    if (!category) {
      return { data: { getCategory: null } };
    }
    return {
      data: {
        getCategory: {
          _id: category._id,
          name: category.name,
          slug: category.slug,
          products: productsOfCategory(category).map(productInCategoryDetail),
        },
      },
    };
  },
});

export { createDemoLink };
