import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
};

export type Category = {
  __typename?: 'Category';
  _id: Scalars['String']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CategoryListResponse = {
  __typename?: 'CategoryListResponse';
  items: Array<Category>;
  total: Scalars['Int']['output'];
};

export type Product = {
  __typename?: 'Product';
  _id: Scalars['String']['output'];
  category?: Maybe<Category>;
  description?: Maybe<Scalars['String']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  name: Scalars['String']['output'];
  price?: Maybe<Scalars['Float']['output']>;
  slug: Scalars['String']['output'];
};

export type ProductListResponse = {
  __typename?: 'ProductListResponse';
  items: Array<Product>;
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  category?: Maybe<Category>;
  getCategory?: Maybe<Category>;
  getCategoryList: CategoryListResponse;
  getProduct?: Maybe<Product>;
  getProductList: ProductListResponse;
  product?: Maybe<Product>;
};

export type QueryCategoryArgs = {
  _id: Scalars['ID']['input'];
};

export type QueryGetCategoryArgs = {
  _id: Scalars['ID']['input'];
};

export type QueryGetProductArgs = {
  _id: Scalars['ID']['input'];
};

export type QueryGetProductListArgs = {
  from?: InputMaybe<Scalars['Int']['input']>;
  size?: InputMaybe<Scalars['Int']['input']>;
  where?: InputMaybe<TsWhereProductInput>;
};

export type QueryProductArgs = {
  _id: Scalars['ID']['input'];
};

export type TsWhereCategoryInput = {
  AND?: InputMaybe<Array<TsWhereCategoryInput>>;
  NOT?: InputMaybe<TsWhereCategoryInput>;
  OR?: InputMaybe<Array<TsWhereCategoryInput>>;
  _id?: InputMaybe<TsWhereIdInput>;
  name?: InputMaybe<TsWhereStringInput>;
  products?: InputMaybe<TsWhereProductInput>;
  slug?: InputMaybe<TsWhereStringInput>;
};

export type TsWhereFloatInput = {
  eq?: InputMaybe<Scalars['Float']['input']>;
  gt?: InputMaybe<Scalars['Float']['input']>;
  gte?: InputMaybe<Scalars['Float']['input']>;
  lt?: InputMaybe<Scalars['Float']['input']>;
  lte?: InputMaybe<Scalars['Float']['input']>;
  ne?: InputMaybe<Scalars['Float']['input']>;
};

export type TsWhereIdInput = {
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  inIn?: InputMaybe<Array<Scalars['String']['input']>>;
  ne?: InputMaybe<Scalars['String']['input']>;
};

export type TsWhereProductInput = {
  AND?: InputMaybe<Array<TsWhereProductInput>>;
  NOT?: InputMaybe<TsWhereProductInput>;
  OR?: InputMaybe<Array<TsWhereProductInput>>;
  _id?: InputMaybe<TsWhereIdInput>;
  category?: InputMaybe<TsWhereCategoryInput>;
  name?: InputMaybe<TsWhereStringInput>;
  price?: InputMaybe<TsWhereFloatInput>;
  slug?: InputMaybe<TsWhereStringInput>;
};

export type TsWhereStringInput = {
  contains?: InputMaybe<Scalars['String']['input']>;
  eq?: InputMaybe<Scalars['String']['input']>;
  in?: InputMaybe<Array<Scalars['String']['input']>>;
  inIn?: InputMaybe<Array<Scalars['String']['input']>>;
  ne?: InputMaybe<Scalars['String']['input']>;
};

export type GetCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetCategoriesQuery = {
  __typename?: 'Query';
  getCategoryList: {
    __typename?: 'CategoryListResponse';
    total: number;
    items: Array<{
      __typename?: 'Category';
      _id: string;
      name: string;
      slug: string;
      products: Array<{
        __typename?: 'Product';
        _id: string;
        description?: string | null;
        name: string;
        price?: number | null;
        slug: string;
      }>;
    }>;
  };
};

export type GetCategoryQueryVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;

export type GetCategoryQuery = {
  __typename?: 'Query';
  getCategory?: {
    __typename?: 'Category';
    _id: string;
    name: string;
    slug: string;
    products: Array<{
      __typename?: 'Product';
      _id: string;
      description?: string | null;
      image?: string | null;
      name: string;
      price?: number | null;
      slug: string;
    }>;
  } | null;
};

export type GetProductsQueryVariables = Exact<{ [key: string]: never }>;

export type GetProductsQuery = {
  __typename?: 'Query';
  getProductList: {
    __typename?: 'ProductListResponse';
    total: number;
    items: Array<{
      __typename?: 'Product';
      _id: string;
      description?: string | null;
      image?: string | null;
      name: string;
      price?: number | null;
      slug: string;
      category?: { __typename?: 'Category'; _id: string; name: string; slug: string } | null;
    }>;
  };
};

export type GetProductQueryVariables = Exact<{
  _id: Scalars['ID']['input'];
}>;

export type GetProductQuery = {
  __typename?: 'Query';
  getProduct?: {
    __typename?: 'Product';
    _id: string;
    slug: string;
    name: string;
    description?: string | null;
    image?: string | null;
    price?: number | null;
    category?: { __typename?: 'Category'; _id: string; name: string; slug: string } | null;
  } | null;
};

export type GetProductBySlugQueryVariables = Exact<{
  where: TsWhereProductInput;
}>;

export type GetProductBySlugQuery = {
  __typename?: 'Query';
  getProductList: {
    __typename?: 'ProductListResponse';
    items: Array<{
      __typename?: 'Product';
      _id: string;
      description?: string | null;
      image?: string | null;
      name: string;
      price?: number | null;
      slug: string;
      category?: { __typename?: 'Category'; _id: string; name: string; slug: string } | null;
    }>;
  };
};

export type GetProductRecommendationsQueryVariables = Exact<{
  where: TsWhereProductInput;
  size?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetProductRecommendationsQuery = {
  __typename?: 'Query';
  getProductList: {
    __typename?: 'ProductListResponse';
    items: Array<{
      __typename?: 'Product';
      _id: string;
      description?: string | null;
      image?: string | null;
      name: string;
      price?: number | null;
      slug: string;
      category?: { __typename?: 'Category'; _id: string; name: string; slug: string } | null;
    }>;
  };
};

export const GetCategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCategories' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getCategoryList' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'products' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCategoriesQuery, GetCategoriesQueryVariables>;
export const GetCategoryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetCategory' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: '_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getCategory' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: '_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'products' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetCategoryQuery, GetCategoryQueryVariables>;
export const GetProductsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProducts' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getProductList' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'total' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetProductsQuery, GetProductsQueryVariables>;
export const GetProductDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProduct' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: '_id' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'ID' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getProduct' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: '_id' },
                value: { kind: 'Variable', name: { kind: 'Name', value: '_id' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'category' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetProductQuery, GetProductQueryVariables>;
export const GetProductBySlugDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProductBySlug' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'TSWhereProductInput' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getProductList' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetProductBySlugQuery, GetProductBySlugQueryVariables>;
export const GetProductRecommendationsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetProductRecommendations' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'TSWhereProductInput' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'size' } },
          type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'getProductList' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'where' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'where' } },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'from' },
                value: { kind: 'IntValue', value: '0' },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'size' },
                value: { kind: 'Variable', name: { kind: 'Name', value: 'size' } },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'items' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            { kind: 'Field', name: { kind: 'Name', value: '_id' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                            { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                          ],
                        },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'image' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'slug' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetProductRecommendationsQuery,
  GetProductRecommendationsQueryVariables
>;
