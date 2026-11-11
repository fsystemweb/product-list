import {
  ApolloClient,
  ApolloError,
  ApolloLink,
  InMemoryCache,
  Observable,
} from '@apollo/client/core';
import type { FetchResult } from '@apollo/client/core';
import { DemoFallbackLink } from './demo-fallback.link';
import { createDemoLink } from './demo-link';
import {
  GetCategoriesDocument,
  GetCategoryDocument,
  GetProductBySlugDocument,
  GetProductDocument,
  GetProductsDocument,
} from './generated';

const createClient = (link: ApolloLink): ApolloClient<any> =>
  new ApolloClient({ link, cache: new InMemoryCache() });

const networkErrorLink = (): ApolloLink =>
  new ApolloLink(
    () =>
      new Observable(subscriber =>
        subscriber.error(new ApolloError({ networkError: new TypeError('Failed to fetch') }))
      )
  );

const graphqlErrorLink = (): ApolloLink =>
  new ApolloLink(
    () =>
      new Observable(subscriber =>
        subscriber.error(new ApolloError({ graphQLErrors: [{ message: 'boom' }] }))
      )
  );

const dataLink = (result: FetchResult): ApolloLink =>
  new ApolloLink(
    () =>
      new Observable(subscriber => {
        subscriber.next(result);
        subscriber.complete();
      })
  );

describe('createDemoLink', () => {
  it('serves the demo product list', async () => {
    const client = createClient(createDemoLink());

    const result = await client.query({ query: GetProductsDocument });

    expect(result.data?.getProductList.items.length).toBeGreaterThan(0);
    expect(result.data?.getProductList.total).toBe(result.data?.getProductList.items.length);
  });

  it('looks up a product by id', async () => {
    const client = createClient(createDemoLink());

    const result = await client.query({
      query: GetProductDocument,
      variables: { _id: 'keystone-supreme' },
    });

    expect(result.data?.getProduct?.name).toBe('Keystone Supreme');
  });

  it('returns null for an unknown product id', async () => {
    const client = createClient(createDemoLink());

    const result = await client.query({
      query: GetProductDocument,
      variables: { _id: 'does-not-exist' },
    });

    expect(result.data?.getProduct).toBeNull();
  });

  it('filters the product list by slug', async () => {
    const client = createClient(createDemoLink());

    const result = await client.query({
      query: GetProductBySlugDocument,
      variables: { where: { slug: { eq: 'colombian-arabica-70' } } },
    });

    expect(result.data?.getProductList.items).toHaveLength(1);
    expect(result.data?.getProductList.items[0]?.name).toBe('Colombian Arabica 70/30');
  });

  it('returns an empty list for an unknown slug', async () => {
    const client = createClient(createDemoLink());

    const result = await client.query({
      query: GetProductBySlugDocument,
      variables: { where: { slug: { eq: 'unknown-slug' } } },
    });

    expect(result.data?.getProductList.items).toHaveLength(0);
  });

  it('returns the categories with their products', async () => {
    const client = createClient(createDemoLink());

    const result = await client.query({ query: GetCategoriesDocument });

    expect(result.data?.getCategoryList.items.map(c => c.slug)).toEqual([
      'coffee-beans',
      'coffee-machines',
      'coffee-accessories',
    ]);
    expect(result.data?.getCategoryList.items.every(c => c.products.length > 0)).toBe(true);
  });

  it('looks up a category by id', async () => {
    const client = createClient(createDemoLink());

    const result = await client.query({
      query: GetCategoryDocument,
      variables: { _id: 'coffee-beans' },
    });

    expect(result.data?.getCategory?.name).toBe('Coffee Beans');
    expect(result.data?.getCategory?.products).toHaveLength(3);
  });
});

describe('DemoFallbackLink', () => {
  it('falls back to the demo link on network errors', async () => {
    const link = new DemoFallbackLink({
      primary: networkErrorLink(),
      fallback: createDemoLink(),
    });
    const client = createClient(link);

    const result = await client.query({ query: GetProductsDocument });

    // If the primary link had been used, this query would have rejected.
    expect(result.data?.getProductList.items.length).toBeGreaterThan(0);
  });

  it('passes successful primary responses through', async () => {
    const primaryData = { getProductList: { items: [], total: 0 } };
    const primaryLink = dataLink({ data: primaryData });
    const link = new DemoFallbackLink({ primary: primaryLink, fallback: createDemoLink() });
    const client = createClient(link);

    const result = await client.query({ query: GetProductsDocument });

    expect(result.data?.getProductList).toEqual(primaryData.getProductList);
  });

  it('does not fall back for GraphQL (non-network) errors', async () => {
    let fallbackUsed = false;
    const fallbackLink = new ApolloLink(() => {
      fallbackUsed = true;
      return new Observable<FetchResult>(subscriber => subscriber.complete());
    });
    const link = new DemoFallbackLink({ primary: graphqlErrorLink(), fallback: fallbackLink });
    const client = createClient(link);

    await expect(client.query({ query: GetProductsDocument })).rejects.toThrow('boom');

    expect(fallbackUsed).toBe(false);
  });
});
