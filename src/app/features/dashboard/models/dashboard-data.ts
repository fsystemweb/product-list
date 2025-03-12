import { ApolloQueryResult } from '@apollo/client/core';
import { ApolloArray } from '../../../models/arrays-apollo';
import { Category } from '../../../models/category';
import { Product } from '../../../models/product';

export interface DashboardData {
  products: ApolloQueryResult<ApolloArray<Product>>;
  categories: ApolloQueryResult<ApolloArray<Category>>;
}
